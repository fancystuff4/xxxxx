import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {

    constructor(@InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>){

    }

    async getAllTenant(): Promise<Tenant[]>{
        return this.tenantRepository.find();
    }
    async createTenant(data): Promise<Tenant>{
        return this.tenantRepository.save(data);
    }
    
    async getTenantById(id: number): Promise<Tenant>{
        return this.tenantRepository.findOne({id});
    }

    async updateTenant(id: number, data): Promise<any>{
        return this.tenantRepository.update(id,data);
    }

    async deleteTenant(id: number): Promise<any>{
        return this.tenantRepository.delete(id);
    }
}
