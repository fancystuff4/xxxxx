"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("./decorators/roles.decorator");
const createTenant_dto_1 = require("./dto/createTenant.dto");
const paginateTenant_dto_1 = require("./dto/paginateTenant.dto");
const updateTenant_dto_1 = require("./dto/updateTenant.dto");
const updateUserStatus_dto_1 = require("./dto/updateUserStatus.dto");
const getTenant_dto_1 = require("./dto/getTenant.dto");
const roles_enum_1 = require("./roles.enum");
const tenant_service_1 = require("./tenant.service");
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async getAllTenants(res, paginateTenantDto) {
        try {
            const tenant = await this.tenantService.getAllTenant(paginateTenantDto);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenants: tenant.data,
                    lastItem: tenant.lastItem
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenants',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async createTenant(createTenantDto, res) {
        try {
            const newTenant = await this.tenantService.createTenant(createTenantDto);
            if (newTenant.ok) {
                return res.status(common_1.HttpStatus.CREATED).json({
                    ok: true,
                    data: newTenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Adding New Tenant',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error.message,
            });
        }
    }
    async getOne(getTenantDto, res) {
        try {
            const tenant = await this.tenantService.getTenantById(getTenantDto);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async updateTenant(tenant_id, updateTenantDto, res) {
        try {
            const tenant = await this.tenantService.updateTenant(tenant_id, updateTenantDto);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update Tenant',
                    error: tenant.error
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async deleteTenant(tenant_id, res) {
        try {
            const tenant = await this.tenantService.deleteTenant(tenant_id);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.NO_CONTENT).json({
                    ok: true
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async addPaymentService(tenant_id, createPaymentDto, res) {
        try {
            const tenant = await this.tenantService.addPaymentService(tenant_id, createPaymentDto);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async addPaymentCredentials(tenant_id, createPaymentDto, res) {
        try {
            const tenant = await this.tenantService.addPaymentCredentials(tenant_id, createPaymentDto);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                    error: tenant.message
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async removePaymentCredentials(tenant_id, payment_service, res) {
        try {
            const tenant = await this.tenantService.removePaymentCredentials(tenant_id, payment_service);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async getAllUsers(tenant_id, res) {
        try {
            const users = await this.tenantService.getAllUsers(tenant_id);
            if (users.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    users: users.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Users',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async getUserById(tenant_id, user_id, res) {
        try {
            const user = await this.tenantService.getUserById(tenant_id, user_id);
            if (user.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    user: user.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get User',
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async updateUserStatus(tenant_id, user_id, updateUserStatus, res) {
        try {
            const user = await this.tenantService.updateUserStatus(tenant_id, user_id, updateUserStatus);
            if (user.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    user: user.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update User',
                    error: user.error
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async updateTenantStatus(tenant_id, updateUserStatus, res) {
        try {
            const tenant = await this.tenantService.updateTenantStatus(tenant_id, updateUserStatus);
            if (tenant.ok) {
                return res.status(common_1.HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            }
            else {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update Tenant',
                    error: tenant.error
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.SUPERADMIN),
    (0, common_1.Get)('all/:lastItem?'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, paginateTenant_dto_1.paginateTenantDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getAllTenants", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTenant_dto_1.CreateTenantDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Get)(':tenantId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getTenant_dto_1.GetTenantDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':tenant_id'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateTenant_dto_1.updateTenantDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Delete)(":tenant_id"),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "deleteTenant", null);
__decorate([
    (0, common_1.Post)('/:tenant_id/payments/services'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createTenant_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "addPaymentService", null);
__decorate([
    (0, common_1.Post)('/:tenant_id/payments'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createTenant_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "addPaymentCredentials", null);
__decorate([
    (0, common_1.Delete)('/:tenant_id/payments/:payment_service'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Param)('payment_service')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "removePaymentCredentials", null);
__decorate([
    (0, common_1.Get)(':tenant_id/users/'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':tenant_id/users/:user_id'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(':tenant_id/users/:user_id/status/'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, updateUserStatus_dto_1.UpdateUserStatus, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateUserStatus", null);
__decorate([
    (0, common_1.Put)(':tenant_id/status'),
    __param(0, (0, common_1.Param)('tenant_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateUserStatus_dto_1.UpdateUserStatus, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateTenantStatus", null);
TenantController = __decorate([
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map