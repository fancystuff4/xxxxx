import { Body, Controller, Get, Post, Response, Param,Delete,Put, Query, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ApiTags } from '@nestjs/swagger';
import { AddTenantDto } from './dto/addTenantDto';
import { AuthenticationService } from '../authentication/authentication.service';

@ApiTags('Tenant')
@Controller()
class TenantController {
    constructor(private tenantService: TenantService,private authenticationService:AuthenticationService) {}

    @Get("tenants/all/:lastItem?")
    async getAllTenants(
        @Response() res: any,
        @Query('lastItem') lastItem: string
    ) : Promise< any> {
        console.log(lastItem);
        const result :  any = await this.tenantService.getAllTenants(lastItem);
        return res.status(result.statusCode).json(result);
    }
    
    @Get("tenants/:tenantId")
    async getOneTenant(
        @Response() res: any,
        @Param("tenantId") tenantId: string
    ) : Promise< any> {
        const result :  any = await this.tenantService.getTenant(tenantId);
        return res.status(result.statusCode).json(result);
    }

    @Delete("tenants/:tenantId")
    async deleteTenant(
        @Response() res: any,
        @Param("tenantId") tenantId: string
    ) : Promise< any> {
        const result :  any = await this.tenantService.deleteTenant(tenantId);
        return res.status(result.statusCode).json(result);
    }

    @Post("tenants")
    async createTenant(
        @Response() res: any,
        @Body() addTenantDto:AddTenantDto,
    ) : Promise< any> {
        // const body ={
        //     username:addTenantDto.username,
        //     password:addTenantDto.password,
        //     role:'TENANT',
        // }
        // const signupResult = await this.authenticationService.signup(body);
        const result  = await this.tenantService.createTenant(addTenantDto);
        return res.status(result.statusCode).json(result);
    }

    async updateTenant(
        @Response() res: any,
        @Param() tenantId: string,
        @Body() body:string
    ) : Promise< any> {
        const result :  any = await this.tenantService.updateTenant(tenantId,body);
        return res.status(result.statusCode).json(result);
    }

    @Put("tenants/:tenantId/status")
    async updateTenantStatus(
        @Response() res: any,
        @Param() tenantId: string,
        @Body() body:string
    ) : Promise< any> {
        const result :  any = await this.tenantService.updateTenantStatus(tenantId,body);
        return res.status(result.statusCode).json(result);
    }

    @Post("superadmin/:superAdminId/payments")
    async addPaymentService(
        @Response() res: any,
        @Param("superAdminId") superAdminId: string,
        @Body() body:string
    ) : Promise< any> {
        const result :  any = await this.tenantService.addPaymentService(superAdminId,body);
        return res.status(result.statusCode).json(result);
    }

    @Put('superadmin/:superAdminId/payments/:serviceName')
    async editPaymentService(
        @Response() res: any,
        @Param("superAdminId") superAdminId: string,
        @Param("serviceName") serviceName: string,
        @Body() body:string
    ) : Promise< any> {
        const result :  any = await this.tenantService.editPaymentService(superAdminId,serviceName,body);
        return res.status(result.statusCode).json(result);
    }

    @Post('superadmin/:superAdminId/tenant/:tenantId/payments')
    async addTenantPaymentCredentials(
        @Response() res: any,
        @Param("superAdminId") superAdminId: string,
        @Param("tenantId") tenantId: string,
        @Body() body:string
    ) : Promise< any> {
        const result :  any = await this.tenantService.addTenantPaymentCredentials(superAdminId,tenantId,body);
        return res.status(result.statusCode).json(result);
    }

    @Delete('tenants/:tenantId/payments/:serviceName')
    async removeTenantPaymentCredentials(
        @Response() res: any,
        @Param("serviceName") serviceName: string,
        @Param("tenantId") tenantId: string,
    ) : Promise< any> {
        const result :  any = await this.tenantService.removeTenantPaymentCredentials(tenantId,serviceName);
        return res.status(result.statusCode).json(result);
    }



}
export default TenantController;