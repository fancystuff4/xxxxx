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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_repository_1 = require("./tenant.repository");
let TenantService = class TenantService {
    constructor(tenantRepository) {
        this.tenantRepository = tenantRepository;
    }
    async getAllTenant(paginateTenantDto) {
        const Tenants = await this.tenantRepository.getTenants(paginateTenantDto);
        return Tenants;
    }
    async createTenant(data) {
        return this.tenantRepository.createTenant(data);
    }
    async getTenantById(getTenantDto) {
        return this.tenantRepository.getTenantById(getTenantDto);
    }
    async updateTenant(tenant_id, data) {
        return this.tenantRepository.updateTenant(tenant_id, data);
    }
    async addPaymentCredentials(tenant_id, data) {
        return this.tenantRepository.addPaymentCredentials(tenant_id, data);
    }
    async addPaymentService(tenant_id, data) {
        return this.tenantRepository.addPaymentService(tenant_id, data);
    }
    async removePaymentCredentials(tenant_id, paymenService) {
        return this.tenantRepository.removePaymentCredentials(tenant_id, paymenService);
    }
    async getAllUsers(tenant_id) {
        return this.tenantRepository.getUsers(tenant_id);
    }
    async getUserById(tenant_id, user_id) {
        return this.tenantRepository.getUserById(tenant_id, user_id);
    }
    async updateUserStatus(tenant_id, user_id, data) {
        return this.tenantRepository.updateUserStatus(tenant_id, user_id, data);
    }
    async updateTenantStatus(tenant_id, data) {
        return this.tenantRepository.updateTenantStatus(tenant_id, data);
    }
    async deleteTenant(tenant_id) {
        return this.tenantRepository.deleteTenant(tenant_id);
    }
};
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_repository_1.TenantRepository])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map