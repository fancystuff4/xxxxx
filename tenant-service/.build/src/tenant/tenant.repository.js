"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../db/client");
const bcrypt = require("bcrypt");
class TenantRepository {
    constructor() { }
    async createTenant(CreateTenantDto) {
        const saltOrRounds = 10;
        const password = CreateTenantDto.password;
        const hashed = await bcrypt.hash(password, saltOrRounds);
        const address = {
            city: CreateTenantDto.city,
            state: CreateTenantDto.state,
            country: CreateTenantDto.country,
            pin: CreateTenantDto.pin,
        };
        const newTenant = {
            PK: `TENANT${CreateTenantDto.username}`,
            SK: `TENANT${CreateTenantDto.username}`,
            fullname: CreateTenantDto.fullname,
            username: CreateTenantDto.username,
            password: hashed,
            address: address,
            status: CreateTenantDto.status,
            paymentdata: {},
            role: 'Tenant'
        };
        try {
            await client_1.default
                .transactWrite({
                TransactItems: [{
                        Put: {
                            Item: newTenant,
                            TableName: 'tenant',
                            ConditionExpression: 'attribute_not_exists(PK)'
                        },
                    }]
            })
                .promise();
        }
        catch (error) {
            if (error.code === 'TransactionCanceledException') {
                error = 'Tenant With This Username Already Exists';
            }
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true, data: newTenant };
    }
    async getTenantById(getTenantDto) {
        let tenant;
        try {
            const result = await client_1.default.query({
                TableName: 'tenant',
                KeyConditionExpression: "#tenant_id=:tenantId",
                ExpressionAttributeValues: {
                    ":tenantId": getTenantDto.tenantId
                },
                ExpressionAttributeNames: {
                    "#tenant_id": "PK",
                },
            })
                .promise();
            tenant = result.Items;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with ID "${getTenantDto.tenantId}" not found`);
        }
        return { ok: true, data: tenant };
    }
    async getTenants(paginateTenantDto) {
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
                Limit: 15,
            };
            if (paginateTenantDto.lastItem) {
                params['ExclusiveStartKey'] = { 'PK': paginateTenantDto.lastItem, 'SK': paginateTenantDto.lastItem };
            }
            const result = await client_1.default
                .scan(params)
                .promise();
            tenants = result.Items;
            lastItemKey = result.LastEvaluatedKey;
        }
        catch (error) {
            if (error) {
                throw new common_1.InternalServerErrorException(error);
            }
        }
        if (!tenants) {
            throw new common_1.NotFoundException(`Tenants not found`);
        }
        return { ok: true, data: tenants, lastItem: lastItemKey };
    }
    async updateTenant(tenant_id, updateTenantDto) {
        let result;
        try {
            const updateAddress = {
                city: updateTenantDto.city,
                state: updateTenantDto.state,
                country: updateTenantDto.country,
                pin: updateTenantDto.pin,
            };
            result = await client_1.default
                .update({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': tenant_id },
                UpdateExpression: "set #fullname = :n, #address = :address",
                ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                ExpressionAttributeValues: {
                    ":n": `${updateTenantDto.fullname}`,
                    ":address": updateAddress
                },
                ExpressionAttributeNames: {
                    "#fullname": "fullname",
                    "#address": "address"
                },
                ReturnValues: "ALL_NEW"
            })
                .promise();
        }
        catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                error = 'TenantId Not Found';
                return { ok: false, error: error };
            }
            else {
                throw new common_1.InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }
    async updateTenantStatus(tenant_id, data) {
        let result;
        try {
            result = await client_1.default
                .update({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': tenant_id },
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
        }
        catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                error = 'TenantId Not Found';
                return { ok: false, error: error };
            }
            else {
                throw new common_1.InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }
    async deleteTenant(tenant_id) {
        let result;
        try {
            result = await client_1.default
                .delete({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': tenant_id },
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true };
    }
    async addPaymentCredentials(tenant_id, data) {
        var _a;
        let result;
        const name = data.paymentService;
        try {
            const response = await client_1.default.query({
                TableName: 'tenant',
                KeyConditionExpression: "#tenant_id=:tenantId",
                ExpressionAttributeValues: {
                    ":tenantId": 'super'
                },
                ExpressionAttributeNames: {
                    "#tenant_id": "PK"
                },
            }).promise();
            if (((_a = response === null || response === void 0 ? void 0 : response.Items[0]) === null || _a === void 0 ? void 0 : _a.paymentdata) && response.Items[0].paymentdata.hasOwnProperty(name)) {
                const keys = Object.keys(response.Items[0].paymentdata[name]);
                const paymentCredentials = {};
                for (var i = 0; i < keys.length; i++) {
                    paymentCredentials[keys[i]] = data.credentials[i];
                }
                result = await client_1.default
                    .update({
                    TableName: 'tenant',
                    Key: { 'PK': tenant_id, 'SK': tenant_id },
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
            }
            else {
                return { ok: false, message: 'Payment Service Not Exists' };
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }
    async addPaymentService(tenant_id, data) {
        let result;
        const paymentService = data.paymentProperties.reduce((a, v) => (Object.assign(Object.assign({}, a), { [v]: v })), {});
        const name = data.paymentService;
        try {
            result = await client_1.default
                .update({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': tenant_id },
                ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                UpdateExpression: "set #paymentdata.#cred = :paymentData",
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }
    async removePaymentCredentials(tenant_id, paymentService) {
        let result;
        try {
            result = await client_1.default
                .update({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': tenant_id },
                ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
                UpdateExpression: "REMOVE #paymentdata.#cred ",
                ExpressionAttributeNames: {
                    "#paymentdata": 'paymentdata',
                    "#cred": paymentService
                },
                ReturnValues: "ALL_NEW"
            })
                .promise();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return { ok: true, data: result.Attributes };
    }
    async getUsers(tenant_id) {
        let users;
        try {
            const result = await client_1.default
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
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!users) {
            throw new common_1.NotFoundException(`Users not found`);
        }
        return { ok: true, data: users };
    }
    async getUserById(tenant_id, user_id) {
        let user;
        try {
            const result = await client_1.default
                .get({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': user_id },
            })
                .promise();
            user = result.Item;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${user_id}" not found`);
        }
        return { ok: true, data: user };
    }
    async updateUserStatus(tenant_id, user_id, data) {
        let result;
        try {
            result = await client_1.default
                .update({
                TableName: 'tenant',
                Key: { 'PK': tenant_id, 'SK': user_id },
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
        }
        catch (error) {
            if (error.code === 'ConditionalCheckFailedException') {
                error = 'UserId Or TenantId Not Found';
                return { ok: false, error: error };
            }
            else {
                throw new common_1.InternalServerErrorException(error);
            }
        }
        return { ok: true, data: result.Attributes };
    }
}
exports.TenantRepository = TenantRepository;
//# sourceMappingURL=tenant.repository.js.map