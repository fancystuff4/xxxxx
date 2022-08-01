import { CreateTenantDto } from './dto/createTenant.dto';
import { UpdateTenantDto } from './dto/updateTenant.dto';
import { AddPaymentServiceDto } from './dto/addPaymentService.dto';
import { PaymentServiceDto } from './dto/paymentService.dto';
import { PaginateTenantDto } from './dto/paginateTenant.dto';
import { AddPaymentCredentialsDto } from './dto/addPaymentCredentials.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import client from '../db/client';
import { v4 as uuid } from 'uuid';
import { GetTenantDto } from './dto/getTenant.dto';
import { EditPaymentServiceDto } from './dto/editPaymentService.dto';
import { ServiceNameDto } from './dto/serviceName.dto';
import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserStatus } from './dto/updateUserStatus.dto';

export class TenantRepository {
    constructor() { }

    async createTenant(CreateTenantDto: CreateTenantDto) {
        // const saltOrRounds = 10;
        // const password = CreateTenantDto.password;
        // const hashed = await bcrypt.hash(password, saltOrRounds);

        const address = {
            fulladdress:CreateTenantDto.fulladdress,
            city: CreateTenantDto.city,
            state: CreateTenantDto.state,
            country: CreateTenantDto.country,
            pin: CreateTenantDto.pin,
        }

        const newTenant = {
            PK: `TENANT${CreateTenantDto.username}`,
            SK: `TENANT${CreateTenantDto.username}`,
            fullname: CreateTenantDto.fullname,
            username: CreateTenantDto.username,
            // password: hashed,
            address: address,
            status: CreateTenantDto.status,
            paymentdata: {},
            role: 'Tenant'
        }


        try {
            await client
                .transactWrite({
                    TransactItems: [{
                        Put: {
                            Item: newTenant,
                            TableName: 'tenant',
                            ConditionExpression: 'attribute_not_exists(PK)'
                        },

                    }]})
                .promise();
        } catch (error) {
            if (error.code === 'TransactionCanceledException') {
                error = 'Tenant With This Username Already Exists';
                return { ok: false, message: error}
            }
            throw new InternalServerErrorException(error);


        }

        return { ok: true, data: newTenant };
    }

    async getTenantById(tenantId) {
        console.log(tenantId)
        let tenant;
        try {
            const result = await client.query({
                TableName: 'tenant',
                KeyConditionExpression: "#tenant_id=:tenantId",
                
                ExpressionAttributeValues: {
                    ":tenantId": tenantId
                },
                ExpressionAttributeNames: {
                    "#tenant_id": "PK",
                },
            })
                .promise();

            tenant = result.Items[0];
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
        if (!tenant) {
            return { ok: false,error:`Tenant ID not found` };
        }

        return { ok: true, data: tenant };
    }

    async getTenants(paginateTenantDto:PaginateTenantDto) {
        console.log(paginateTenantDto.lastItem)
        let tenants;
        let lastItemKey;
        try {
            const params = {
                TableName: 'tenant',
                FilterExpression: "#roles = :a",
                ExpressionAttributeValues: {
                    ":a": "Tenant"
                },
                ExpressionAttributeNames: {
                    "#roles": "role"
                },
                Limit: 2,

            };
            if (paginateTenantDto.lastItem) {
                params['ExclusiveStartKey'] = { 'PK': paginateTenantDto.lastItem, 'SK': paginateTenantDto.lastItem }
            }
            const result = await client
                .scan(params)
                .promise();

            tenants = result.Items;
            lastItemKey = result.LastEvaluatedKey;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: tenants, lastItem: lastItemKey };
    }

    async updateTenant(getTenantDto: GetTenantDto, updateTenantDto: UpdateTenantDto) {
        let result;

        try {
            const updateAddress = {
                fulladdress:updateTenantDto.fulladdress,
                city: updateTenantDto.city,
                state: updateTenantDto.state,
                country: updateTenantDto.country,
                pin: updateTenantDto.pin,

            }
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK': getTenantDto.tenantId, 'SK': getTenantDto.tenantId },
                    UpdateExpression: "set #fullname = :n, #address = :address,#status=:status",
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":n": `${updateTenantDto.fullname}`,
                        ":address": updateAddress,
                        ":status": updateTenantDto.status
                    },
                    ExpressionAttributeNames: {
                        "#fullname": "fullname",
                        "#address": "address",
                        "#status":"status"
                    },
                    ReturnValues: "ALL_NEW"
                })
                .promise();

        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                return { ok: false,error:`Tenant ID not found` };
            } else {
                throw new InternalServerErrorException(error);
            }
        }


        return { ok: true, data: result.Attributes };
    }

    async updateTenantStatus(getTenantDto:GetTenantDto, updateTenantStatus:UpdateUserStatus) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK': getTenantDto.tenantId, 'SK': getTenantDto.tenantId },
                    UpdateExpression: "set #status = :s",
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":s": updateTenantStatus.status
                    },
                    ExpressionAttributeNames: {
                        "#status": "status",
                    },
                    ReturnValues: "ALL_NEW"
                })
                .promise();

        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                return { ok: false,error:`Tenant ID not found` };
            } else {
                throw new InternalServerErrorException(error);
            }
        }


        return { ok: true, data: result.Attributes };
    }

    async deleteTenant(getTenantDto:GetTenantDto) {
        let result;
        try {
            result = await client
                .delete({
                    TableName: 'tenant',
                    ConditionExpression:'attribute_exists(PK) AND attribute_exists(SK)',
                    Key: { 'PK': getTenantDto.tenantId, 'SK': getTenantDto.tenantId },
                })
                .promise();

        } catch (error) {
            if(error.code === 'ConditionalCheckFailedException'){
                return { ok: false, error:`Tenant ID not found` };
            }
            throw new InternalServerErrorException(error);
        }



        return { ok: true };
    }

    async addPaymentCredentials(superAdminId,tenantId, addPaymentCredentialsDto:AddPaymentCredentialsDto) {
        let result;
        const name = addPaymentCredentialsDto.paymentService;
        const paymentProperties = addPaymentCredentialsDto.paymentProperties;
        const paymentPropertyValues = addPaymentCredentialsDto.paymentPropertyValues;
        try {
            const response = await client.get({
                TableName: 'tenant',
                Key: { 'PK': superAdminId, 'SK': superAdminId }
            }).promise();
            if(Object.keys(response).length!=0){
                if (response?.Item?.paymentdata && response.Item.paymentdata.hasOwnProperty(name)) {
                    var keys = Object.keys(response.Item.paymentdata[name])
                    const checkForAll = paymentProperties.every(elem => keys.includes(elem))
                    if(paymentProperties.length == keys.length && checkForAll) {
                        const paymentCredentials = {};
                        keys.forEach((k, i) => {
                            paymentCredentials[response.Item.paymentdata[name][paymentProperties[i]]]=paymentPropertyValues[i] 
                        })
                        result = await client
                            .update({
                                TableName: 'tenant',
                                Key: { 'PK': tenantId, 'SK': tenantId },
                                ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                                UpdateExpression: "set #paymentdata.#cred = :paymentData",
                                ExpressionAttributeValues: {
                                    ":paymentData": paymentCredentials
                                },
                                ExpressionAttributeNames: {
                                    "#paymentdata": 'paymentdata',
                                    "#cred": name
                                },
                                ReturnValues: "ALL_NEW"
                            })
                            .promise();

                    }else{
                        return { ok: false, message: 'All Valid Payment Properties Required' }
                    }
                } else {
                    return { ok: false, message: 'Payment Service Not Exists' }
                }
            }else{
                return { ok: false, message: 'Invalid SuperadminId' }
            }

        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                return { ok: false, message: 'Invalid TenantId' };
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result };
    }

    async addPaymentService(superAdminId, addPaymentServiceDto:AddPaymentServiceDto) {
        let result;
        const paymentService = addPaymentServiceDto.paymentProperties.reduce((a, v) => ({
            ...a, [v]: uuid()
        }), {})
        const name = addPaymentServiceDto.paymentService;
        try {
            console.log(superAdminId);
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK': `${superAdminId}`, 'SK': `${superAdminId}`},
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    UpdateExpression: "set #paymentdata.#cred = if_not_exists(#paymentdata.#cred,:paymentData)",
                    ExpressionAttributeValues: {
                        ":paymentData": paymentService
                    },
                    ExpressionAttributeNames: {
                        "#paymentdata": 'paymentdata',
                        "#cred": name
                    },
                    ReturnValues: "ALL_NEW"
                })
                .promise();
        } catch (error) {
            console.log(error)
            if (error.code === 'ConditionalCheckFailedException') {
                return { ok: false, error:`Superadmin ID not found` };
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }
    
    async editPaymentService(superAdminId, serviceName, editPaymentServiceDto:EditPaymentServiceDto) {
        let result, response;
        const name = serviceName;
        try {
            response = await client.get({
                TableName: 'tenant',
                Key: { 'PK': superAdminId, 'SK': superAdminId }
            }).promise();
            console.log(superAdminId);

            if (response?.Item?.paymentdata && response?.Item?.paymentdata?.hasOwnProperty(name)) {
                const propertyName = editPaymentServiceDto.newPaymentPropertyName;
                const newPropertyValue = editPaymentServiceDto.newPaymentPropertyValue;
                const params = {
                    TableName: 'tenant',
                    Key: { 'PK': superAdminId, 'SK': superAdminId },
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    ReturnValues: "ALL_NEW"
                }
                if(response.Item.paymentdata[name][newPropertyValue]){
                    console.log(response.Item.paymentdata[name][newPropertyValue])
                    return { ok: false, message: 'Payment Service Property Should Be Unique' }
                }else{
                    if (response.Item.paymentdata[name][propertyName]) {
                        const value = response.Item.paymentdata[name][propertyName];
                        params['UpdateExpression']="set #paymentdata.#cred.#name =:paymentData REMOVE #paymentdata.#cred.#old";
                        params['ExpressionAttributeNames']={"#old": propertyName, "#paymentdata": 'paymentdata', "#cred": name,
                        "#name": newPropertyValue};
                        params['ExpressionAttributeValues']={":paymentData":value};
                    }else{
                        const value = uuid();
                        params['UpdateExpression']="set #paymentdata.#cred.#name =:paymentData";
                        params['ExpressionAttributeNames']={"#paymentdata": 'paymentdata', "#cred": name,
                        "#name": newPropertyValue};
                        params['ExpressionAttributeValues']={":paymentData":value};
                    }
                    result = await client.update(params).promise();
                }
            }else{
                return { ok: false, message: 'Payment Service Not Exists' }
            }
        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                return { ok: false, message: 'Invalid Superadmin Id' };
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }

    async removePaymentCredentials(tenantId, serviceName) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK': tenantId, 'SK': tenantId },
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    UpdateExpression: "REMOVE #paymentdata.#cred ",
                    ExpressionAttributeNames: {
                        "#paymentdata": 'paymentdata',
                        "#cred": serviceName
                    },
                    ReturnValues: "ALL_NEW"
                })
                .promise();

        } catch (error) {
            if(error.code === 'ConditionalCheckFailedException'){
                return { ok: false,message:'Invalid TenantId'}
            }
            throw new InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }

    async getUsers(getTenantDto:GetTenantDto) {
        let users;
        try {
            const result = await client
                .query({
                    TableName: 'tenant',
                    FilterExpression: "#roles = :a",
                    KeyConditionExpression: "#tenant_id = :tenantId",
                    ExpressionAttributeValues: {
                        ":a": "user",
                        ":tenantId": getTenantDto.tenantId
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

    async getUserById(getTenantDto:GetTenantDto, getUserDto:GetUserDto) {
        let user;
        try {
            const result = await client
                .get({
                    TableName: 'tenant',
                    Key: { 'PK': getTenantDto.tenantId, 'SK': getUserDto.userId },
                })
                .promise();

            user = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException(`User with ID "${getUserDto.userId}" not found`);
        }

        return { ok: true, data: user };
    }

    async updateUserStatus(getTenantDto:GetTenantDto, getUserDto:GetUserDto, data) {
        let result;
        try {
            result = await client
                .update({
                    TableName: 'tenant',
                    Key: { 'PK': getTenantDto.tenantId, 'SK': getUserDto.userId },
                    UpdateExpression: "set #status = :s",
                    ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                    ExpressionAttributeValues: {
                        ":s": data.status
                    },
                    ExpressionAttributeNames: {
                        "#status": "status",
                    },
                    ReturnValues: "ALL_NEW"
                })
                .promise();

        } catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                error = 'UserId Or TenantId Not Found';
                return { ok: false, error: error }
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }
}