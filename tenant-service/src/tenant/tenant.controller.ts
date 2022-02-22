import { Body, Controller, Delete, Query,Get,HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
// import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/createTenant.dto';
import { GetUserDto} from './dto/getUser.dto';
import { PaymentServiceDto} from './dto/paymentService.dto';
import { ServiceNameDto} from './dto/serviceName.dto';
import { PaginateTenantDto} from './dto/paginateTenant.dto';
import { UpdateTenantDto} from './dto/updateTenant.dto';
import { AddPaymentServiceDto} from './dto/addPaymentService.dto';
import { EditPaymentServiceDto} from './dto/editPaymentService.dto';
import { AddPaymentCredentialsDto} from './dto/addPaymentCredentials.dto';
import { UpdateUserStatus } from './dto/updateUserStatus.dto';
import { GetTenantDto } from './dto/getTenant.dto';
import { Role } from './roles.enum';
import { TenantService } from './tenant.service';
@Controller()
export class TenantController {

    constructor(private tenantService: TenantService){}

    @Roles(Role.SUPERADMIN)
    @Get('tenants/all/:lastItem?')
    async getAllTenants(@Res() res: any,@Query() paginateTenantDto:PaginateTenantDto){
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

    @Post('tenants')
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

    @Get('tenants/:tenantId')
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

    @Put('tenants/:tenantId')
    async updateTenant(@Param() getTenantDto: GetTenantDto,@Body() updateTenantDto: UpdateTenantDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.updateTenant(getTenantDto,updateTenantDto);
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

    @Delete("tenants/:tenantId")
    async deleteTenant(@Param() getTenantDto: GetTenantDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.deleteTenant(getTenantDto);
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

    @Post('superadmin/:superAdminId/payments')
    async addPaymentService(@Param() paymentServiceDto: PaymentServiceDto,@Body() addPaymentServiceDto: AddPaymentServiceDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.addPaymentService(paymentServiceDto,addPaymentServiceDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: tenant.message,
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

    @Put('superadmin/:superAdminId/payments/:serviceName')
    async editPaymentService(@Param() paymentServiceDto: PaymentServiceDto,@Param() serviceNameDto: ServiceNameDto,@Body() editPaymentServiceDto: EditPaymentServiceDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.editPaymentService(paymentServiceDto,serviceNameDto,editPaymentServiceDto);
            if (tenant.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    tenant: tenant.data,
                });
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({
                    ok: false,
                    message: tenant.message,
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

    @Post('/superadmin/:superAdminId/tenant/:tenantId/payments')
    async addPaymentCredentials(@Param() paymentServiceDto: PaymentServiceDto,@Param() getTenantDto: GetTenantDto,@Body() addPaymentCredentialsDto: AddPaymentCredentialsDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.addPaymentCredentials(paymentServiceDto,getTenantDto,addPaymentCredentialsDto);
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
    
    @Delete('tenants/:tenantId/payments/:serviceName')
    async removePaymentCredentials(@Param() getTenantDto: GetTenantDto,@Param() serviceNameDto: ServiceNameDto, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.removePaymentCredentials(getTenantDto,serviceNameDto);
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

    @Get('tenants/:tenantId/users/')
    async getAllUsers(@Param() getTenantDto: GetTenantDto,@Res() res: any){
        try {
            const users: any = await this.tenantService.getAllUsers(getTenantDto);
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

    @Get('tenants/:tenantId/users/:user_id')
    async getUserById(@Param() getTenantDto: GetTenantDto,@Param() getUserDto: GetUserDto,@Res() res: any){
        try {
            const user: any = await this.tenantService.getUserById(getTenantDto,getUserDto);
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

    @Put('tenants/:tenantId/users/:user_id/status/')
    async updateUserStatus(@Param() getTenantDto: GetTenantDto,@Param() getUserDto: GetUserDto,@Body() updateUserStatus: UpdateUserStatus, @Res() res: any){
        try {
            const user: any = await this.tenantService.updateUserStatus(getTenantDto,getUserDto,updateUserStatus);
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

    @Put('tenants/:tenantId/status')
    async updateTenantStatus(@Param() getTenantDto: GetTenantDto,@Body() updateUserStatus: UpdateUserStatus, @Res() res: any){
        try {
            const tenant: any = await this.tenantService.updateTenantStatus(getTenantDto,updateUserStatus);
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

