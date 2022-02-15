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
    
    async getTenantById(getTenantDto){
        return this.tenantRepository.getTenantById(getTenantDto);
    }

    async updateTenant(tenant_id: string, data){
        return this.tenantRepository.updateTenant(tenant_id,data);
    }

    async addPaymentCredentials(tenant_id: string, data){
        return this.tenantRepository.addPaymentCredentials(tenant_id,data);
    }

    async addPaymentService(tenant_id: string, data){
        return this.tenantRepository.addPaymentService(tenant_id,data);
    }

    
    async removePaymentCredentials(tenant_id: string, paymenService:string){
        return this.tenantRepository.removePaymentCredentials(tenant_id,paymenService);
    }

    async getAllUsers(tenant_id: string){
        return this.tenantRepository.getUsers(tenant_id);
    }

    async getUserById(tenant_id: string,user_id: string){
        return this.tenantRepository.getUserById(tenant_id,user_id);
    }
    
    async updateUserStatus(tenant_id: string,user_id: string,data){
        return this.tenantRepository.updateUserStatus(tenant_id,user_id,data);
    }
    
    async updateTenantStatus(tenant_id: string,data){
        return this.tenantRepository.updateTenantStatus(tenant_id,data);
    }

    async deleteTenant(tenant_id: string){
        return this.tenantRepository.deleteTenant(tenant_id);
    }
}
