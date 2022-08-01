import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Tenant } from './tenant.entity';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {

    constructor(private tenantRepository: TenantRepository){

    }

    async getAllTenant(paginateTenantDto){
        const Tenants = await this.tenantRepository.getTenants(paginateTenantDto);
        return Tenants;
    }
    async createTenant(data){
        return this.tenantRepository.createTenant(data);
    }
    
    async getTenantById(tenantId){
        return this.tenantRepository.getTenantById(tenantId);
    }

    async updateTenant(getTenantDto, data){
        return this.tenantRepository.updateTenant(getTenantDto,data);
    }

    async addPaymentCredentials(paymentServiceDto,getTenantDto, addPaymentCredentialsDto){
        return this.tenantRepository.addPaymentCredentials(paymentServiceDto,getTenantDto,addPaymentCredentialsDto);
    }

    async addPaymentService(paymentServiceDto, addPaymentServiceDto){
        return this.tenantRepository.addPaymentService(paymentServiceDto,addPaymentServiceDto);
    }

    async editPaymentService(superAdminId, serviceNameDto,editPaymentServiceDto){
        return this.tenantRepository.editPaymentService(superAdminId,serviceNameDto,editPaymentServiceDto);
    }

    
    async removePaymentCredentials(tenantId, serviceName){
        return this.tenantRepository.removePaymentCredentials(tenantId,serviceName);
    }

    async getAllUsers(getTenantDto){
        return this.tenantRepository.getUsers(getTenantDto);
    }

    async getUserById(getTenantDto,getUserDto){
        return this.tenantRepository.getUserById(getTenantDto,getUserDto);
    }
    
    async updateUserStatus(getTenantDto,getUserDto,data){
        return this.tenantRepository.updateUserStatus(getTenantDto,getUserDto,data);
    }
    
    async updateTenantStatus(getTenantDto,data){
        return this.tenantRepository.updateTenantStatus(getTenantDto,data);
    }

    async deleteTenant(getTenantDto){
        return this.tenantRepository.deleteTenant(getTenantDto);
    }
}
