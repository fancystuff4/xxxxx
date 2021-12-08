import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {

    constructor(private tenantService: TenantService){

    }

    @Get()
    async getAllTenants(){
        return this.tenantService.getAllTenant()
    }

    @Post()
    async createTenant(@Body() body: Tenant){
        return this.tenantService.createTenant(body);
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.tenantService.getTenantById(id);
    }

    @Put(":id")
    async updateTenant(@Param('id') id: number, @Body() body){
        return this.tenantService.updateTenant(id,body);
    }

    @Delete(":id")
    async deleteTenant(@Param('id') id: number){
        return this.tenantService.deleteTenant(id);
    }
}

