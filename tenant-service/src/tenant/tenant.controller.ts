import { Body, Controller, Delete, Query,Get,HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
// import { Tenant } from './tenant.entity';
import { CreateTenantDto ,CreatePaymentDto} from './dto/createTenant.dto';
import { paginateTenantDto} from './dto/paginateTenant.dto';
import { updateTenantDto} from './dto/updateTenant.dto';
import { UpdateUserStatus } from './dto/updateUserStatus.dto';
import { GetTenantDto } from './dto/getTenant.dto';
import { Role } from './roles.enum';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {

    constructor(private tenantService: TenantService){}

    @Roles(Role.SUPERADMIN)
    @Get('all/:lastItem?')
    async getAllTenants(@Res() res: any,@Query() paginateTenantDto:paginateTenantDto){
        try {
            const tenant: any = await this.tenantService.getAllTenant(paginateTenantDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenants: tenant.data,
                    lastItem: tenant.lastItem
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenants',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Post()
    async createTenant(@Body() createTenantDto: CreateTenantDto, @Res() res: any){
        try {
            const newTenant: any = await this.tenantService.createTenant(createTenantDto);
            if (newTenant.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    data: newTenant.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Adding New Tenant',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error.message,
            });
        }
    }

    @Get(':tenantId')
    async getOne(@Param() getTenantDto: GetTenantDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.getTenantById(getTenantDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Put(':tenant_id')
    async updateTenant(@Param('tenant_id') tenant_id: string,@Body() updateTenantDto: updateTenantDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.updateTenant(tenant_id,updateTenantDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                    
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update Tenant',
                    error:tenant.error
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Delete(":tenant_id")
    async deleteTenant(@Param('tenant_id') tenant_id: string, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.deleteTenant(tenant_id);
            if (tenant.ok) {
                return res.status(HttpStatus.NO_CONTENT).json({
                    ok: true
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Post('/:tenant_id/payments/services')
    async addPaymentService(@Param('tenant_id') tenant_id: string,@Body() createPaymentDto: CreatePaymentDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.addPaymentService(tenant_id,createPaymentDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Post('/:tenant_id/payments')
    async addPaymentCredentials(@Param('tenant_id') tenant_id: string,@Body() createPaymentDto: CreatePaymentDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.addPaymentCredentials(tenant_id,createPaymentDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                    error:tenant.message
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    
    @Delete('/:tenant_id/payments/:payment_service')
    async removePaymentCredentials(@Param('tenant_id') tenant_id: string,@Param('payment_service') payment_service: string, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.removePaymentCredentials(tenant_id,payment_service);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Tenant',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Get(':tenant_id/users/')
    async getAllUsers(@Param('tenant_id') tenant_id: string,@Res() res: any){
        try {
            const users: any = await this.tenantService.getAllUsers(tenant_id);
            if (users.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    users: users.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get Users',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Get(':tenant_id/users/:user_id')
    async getUserById(@Param('tenant_id') tenant_id: string,@Param('user_id') user_id: string,@Res() res: any){
        try {
            const user: any = await this.tenantService.getUserById(tenant_id,user_id);
            if (user.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    user: user.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get User',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Put(':tenant_id/users/:user_id/status/')
    async updateUserStatus(@Param('tenant_id') tenant_id: string,@Param('user_id') user_id: string,@Body() updateUserStatus: UpdateUserStatus, @Res() res: any){
        try {
            const user: any = await this.tenantService.updateUserStatus(tenant_id,user_id,updateUserStatus);
            if (user.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    user: user.data,
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update User',
                    error:user.error
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
    @Put(':tenant_id/status')
    async updateTenantStatus(@Param('tenant_id') tenant_id: string,@Body() updateUserStatus: UpdateUserStatus, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.updateTenantStatus(tenant_id,updateUserStatus);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: 'Error Trying to Update Tenant',
                    error:tenant.error
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
}

