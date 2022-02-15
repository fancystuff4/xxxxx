import { CreateTenantDto } from './dto/createTenant.dto';
import { updateTenantDto } from './dto/updateTenant.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import client from '../db/client';
import * as bcrypt from 'bcrypt';
import { GetTenantDto } from './dto/getTenant.dto';

export class TenantRepository {
    constructor() {}

    async createTenant(CreateTenantDto: CreateTenantDto) {
        const saltOrRounds = 10;
        const password =  CreateTenantDto.password;
        const hashed = await bcrypt.hash(password, saltOrRounds);

        const address ={
            city:CreateTenantDto.city,
            state:CreateTenantDto.state,
            country:CreateTenantDto.country,
            pin:CreateTenantDto.pin,

        }

        
        const newTenant = {
            PK: `TENANT${CreateTenantDto.username}`,
            SK:`TENANT${CreateTenantDto.username}`,
            fullname:CreateTenantDto.fullname,
            username: CreateTenantDto.username,
            password: hashed,
            address:address,
            status: CreateTenantDto.status,
            paymentdata:{},
            role: 'Tenant'
        }
        

        try {
            await client
                .transactWrite({
                    TransactItems:[{
                        Put:{
                            Item: newTenant,
                            TableName: 'tenant',
                            ConditionExpression:'attribute_not_exists(PK)'
                        },

                    }]
                    
                    
                })
                .promise();
        } catch (error) {
            if(error.code==='TransactionCanceledException'){
               error='Tenant With This Username Already Exists';
            }
            throw new InternalServerErrorException(error);
           
            
        }

        return { ok: true, data: newTenant };
    }

    async getTenantById(getTenantDto:GetTenantDto) {
        let tenant;
        try {
            const result = await client.query({
                TableName: 'tenant',
                KeyConditionExpression:"#tenant_id=:tenantId",
                ExpressionAttributeValues: {
                    ":tenantId": getTenantDto.tenantId
                   }, 
                   ExpressionAttributeNames: {
                    "#tenant_id":"PK",
                  },
                })
                .promise();

            tenant = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!tenant) {
            throw new NotFoundException(`Tenant with ID "${getTenantDto.tenantId}" not found`);
        }

        return { ok: true, data: tenant };
    }

    async getTenants(paginateTenantDto) {
        let tenants;
        let lastItemKey;
        try {
            const params={ 
                TableName: 'tenant',
                FilterExpression: "#roles = :a",
                ExpressionAttributeValues: {
                    ":a": "Tenant"
                }, 
                ExpressionAttributeNames: {
                    "#roles": "role"
                },
                Limit: 15,
                     
            };
            if(paginateTenantDto.lastItem){
                params['ExclusiveStartKey']={ 'PK': paginateTenantDto.lastItem,'SK':paginateTenantDto.lastItem}
            }
            const result = await client
                .scan(params)
                .promise();

            tenants = result.Items;
            lastItemKey= result.LastEvaluatedKey;
        } catch (error) {
            if(error){
                throw new InternalServerErrorException(error);
            }
        }

        if (!tenants) {
            throw new NotFoundException(`Tenants not found`);
        }

        return { ok: true, data: tenants,lastItem:lastItemKey };
    }

    async updateTenant(tenant_id,updateTenantDto: updateTenantDto) {
        let result;

        try {
            const updateAddress ={
                city:updateTenantDto.city,
                state:updateTenantDto.state,
                country:updateTenantDto.country,
                pin:updateTenantDto.pin,
    
            }
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':tenant_id },
                    UpdateExpression: "set #fullname = :n, #address = :address",
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":n": `${updateTenantDto.fullname}`,
                        ":address": updateAddress
                    },
                    ExpressionAttributeNames:{
                        "#fullname": "fullname",
                        "#address": "address"
                      },
                      ReturnValues:"ALL_NEW"
                })
                .promise();

        } catch (error) {
            if(error.code==='ConditionalCheckFailedException'){
                error='TenantId Not Found';
                return {ok:false,error:error}
            }else{
                throw new InternalServerErrorException(error);
            }
        }

        

        return { ok: true, data: result.Attributes };
    }

    async updateTenantStatus(tenant_id,data) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':tenant_id },
                    UpdateExpression: "set #status = :s",
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":s": data.status
                    },
                    ExpressionAttributeNames:{
                        "#status": "status",
                      },
                      ReturnValues:"ALL_NEW"
                })
                .promise();

        } catch (error) {
            if(error.code==='ConditionalCheckFailedException'){
                error='TenantId Not Found';
                return {ok:false,error:error}
            }else{
                throw new InternalServerErrorException(error);
            }
        }

        

        return { ok: true, data: result.Attributes };
    }

    async deleteTenant(tenant_id) {
        let result;
        try {
            result = await client
                .delete({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':tenant_id },
                })
                .promise();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        

        return { ok: true };
    }

    async addPaymentCredentials(tenant_id,data) {
        let result;
        const name=data.paymentService;
        try {
            const response  =await client.query({
                TableName: 'tenant',
                KeyConditionExpression:"#tenant_id=:tenantId",
                ExpressionAttributeValues: {
                    ":tenantId": 'super'
                   }, 
                   ExpressionAttributeNames: {
                    "#tenant_id":"PK"
                  },


            }).promise()
            if(response?.Items[0]?.paymentdata && response.Items[0].paymentdata.hasOwnProperty(name)){
                const keys = Object.keys(response.Items[0].paymentdata[name]);
                const paymentCredentials = {};
                for (var i = 0; i < keys.length; i++){
                    paymentCredentials[keys[i]] = data.credentials[i];
                }
                result = await client
                    .update({
                        TableName: 'tenant',
                        Key: { 'PK':tenant_id,'SK':tenant_id },
                        ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                        UpdateExpression: "set #paymentdata.#cred = :paymentData",
                        ExpressionAttributeValues: {
                            ":paymentData":paymentCredentials
                        },
                        ExpressionAttributeNames:{
                            "#paymentdata":'paymentdata',
                            "#cred":name
                        },
                        ReturnValues:"ALL_NEW"
                    })
                    .promise();
            }else{
               return { ok: false, message:'Payment Service Not Exists'}
            }

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }

    async addPaymentService(tenant_id,data) {
        let result;
        const paymentService = data.paymentProperties.reduce((a,v)=>({
            ...a,[v]:v
        }),{})
        const name=data.paymentService;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':tenant_id },
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    UpdateExpression: "set #paymentdata.#cred = :paymentData",
                    ExpressionAttributeValues: {
                        ":paymentData":paymentService
                    },
                    ExpressionAttributeNames:{
                        "#paymentdata":'paymentdata',
                        "#cred":name
                      },
                      ReturnValues:"ALL_NEW"
                })
                .promise();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }

    async removePaymentCredentials(tenant_id,paymentService) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':tenant_id },
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    UpdateExpression: "REMOVE #paymentdata.#cred ",
                    ExpressionAttributeNames:{
                        "#paymentdata":'paymentdata',
                        "#cred":paymentService
                      },
                    ReturnValues:"ALL_NEW"
                })
                .promise();

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }

    async getUsers(tenant_id) {
        let users;
        try {
            const result = await client
                .query({
                    TableName: 'tenant',
                    FilterExpression: "#roles = :a",
                    KeyConditionExpression: "#tenant_id = :tenantId",
                    ExpressionAttributeValues: {
                        ":a": "user",
                        ":tenantId": tenant_id
                       }, 
                       ExpressionAttributeNames: {
                        "#roles": "role",
                        "#tenant_id": "PK"
                      },
                       
                })
                .promise();

            users = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!users) {
            throw new NotFoundException(`Users not found`);
        }

        return { ok: true, data: users };
    }

    async getUserById(tenant_id:string,user_id: string) {
        let user;
        try {
            const result = await client
                .get({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':user_id },
                })
                .promise();

            user = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException(`User with ID "${user_id}" not found`);
        }

        return { ok: true, data: user };
    }

    async updateUserStatus(tenant_id,user_id,data) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK':tenant_id,'SK':user_id },
                    UpdateExpression: "set #status = :s",
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":s": data.status
                    },
                    ExpressionAttributeNames:{
                        "#status": "status",
                      },
                      ReturnValues:"ALL_NEW"
                })
                .promise();

        } catch (error) {
            if(error.code==='ConditionalCheckFailedException'){
                error='UserId Or TenantId Not Found';
                return {ok:false,error:error}
            }else{
                throw new InternalServerErrorException(error);
            }
        }

        

        return { ok: true, data: result.Attributes };
    }
}