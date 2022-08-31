import {
  Body,
  Controller,
  Delete,
  Query,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
// import { Tenant } from './tenant.entity';
import { CreateTenantDto } from './dto/createTenant.dto';
import { GetUserDto } from './dto/getUser.dto';
import { PaymentServiceDto } from './dto/paymentService.dto';
import { ServiceNameDto } from './dto/serviceName.dto';
import { PaginateTenantDto } from './dto/paginateTenant.dto';
import { UpdateTenantDto } from './dto/updateTenant.dto';
import { AddPaymentServiceDto } from './dto/addPaymentService.dto';
import { EditPaymentServiceDto } from './dto/editPaymentService.dto';
import { AddPaymentCredentialsDto } from './dto/addPaymentCredentials.dto';
import { UpdateUserStatus } from './dto/updateUserStatus.dto';
import { GetTenantDto } from './dto/getTenant.dto';
import { TenantService } from './tenant.service';
@Controller()
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get('tenants/all/:lastItem?')
  async getAllTenants(
    @Res() res: any,
    @Query() paginateTenantDto: PaginateTenantDto,
  ) {
    try {
      const tenant: any = await this.tenantService.getAllTenant(
        paginateTenantDto,
      );
      if (tenant.ok) {
        return res.status(200).json({
          ok: true,
          statusCode: 200,
          message: 'List of tenants',
          data: tenant.data,
          lastItem: tenant.lastItem,
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
        error: 'Internal Server Error',
      });
    }
  }

  @Post('tenants')
  async createTenant(
    @Body() createTenantDto: CreateTenantDto,
    @Res() res: any,
  ) {
    try {
      const newTenant: any = await this.tenantService.createTenant(
        createTenantDto,
      );
      if (newTenant.ok) {
        return res.status(201).json({
          ok: true,
          statusCode: 201,
          message: 'New Tenant Created',
          data: newTenant.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Adding New Tenant',
          error: newTenant.message,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }

  @Get('tenants/:tenantId')
  async getOne(@Param('tenantId') tenantId: string, @Res() res: any) {
    try {
      const tenant: any = await this.tenantService.getTenantById(tenantId);
      if (tenant.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 200,
          message: 'Tenant Details',
          data: tenant.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Get Tenant',
          error: tenant.error,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }

  @Put('tenants/:tenantId')
  async updateTenant(
    @Param() getTenantDto: GetTenantDto,
    @Body() updateTenantDto: UpdateTenantDto,
    @Res() res: any,
  ) {
    try {
      const tenant: any = await this.tenantService.updateTenant(
        getTenantDto,
        updateTenantDto,
      );
      if (tenant.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 201,
          message: 'Tenant Details Updated',
          data: tenant.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Update Tenant',
          error: tenant.error,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }

  @Delete('tenants/:tenantId')
  async deleteTenant(@Param() getTenantDto: GetTenantDto, @Res() res: any) {
    try {
      const tenant: any = await this.tenantService.deleteTenant(getTenantDto);

      console.log(tenant);

      if (tenant.ok) {
        return res.json({
          ok: true,
          statusCode: 204,
          message: 'Tenant deleted',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: 'Internal Server Error',
      });
    }
  }

  @Post('superadmin/:superAdminId/payments')
  async addPaymentService(
    @Param('superAdminId') superAdminId: string,
    @Body() addPaymentServiceDto: AddPaymentServiceDto,
    @Res() res: any,
  ) {
    try {
      const service: any = await this.tenantService.addPaymentService(
        superAdminId,
        addPaymentServiceDto,
      );
      if (service.ok) {
        return res.status(201).json({
          statusCode: 201,
          ok: true,
          message: 'Payment Service Added',
          data: service.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Add Payment Service',
          error: service.error,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }

  @Put('superadmin/:superAdminId/payments/:serviceName')
  async editPaymentService(
    @Param('superAdminId') superAdminId: string,
    @Param('serviceName') serviceName: string,
    @Body() editPaymentServiceDto: EditPaymentServiceDto,
    @Res() res: any,
  ) {
    console.log(superAdminId, serviceName);
    try {
      const service: any = await this.tenantService.editPaymentService(
        superAdminId,
        serviceName,
        editPaymentServiceDto,
      );
      if (service.ok) {
        return res.status(HttpStatus.OK).json({
          statusCode: 200,
          ok: true,
          message: 'Payment Service Updated',
          data: service.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Update Payment Service',
          error: service.message,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }

  @Post('/superadmin/:superAdminId/tenant/:tenantId/payments')
  async addPaymentCredentials(
    @Param('superAdminId') superAdminId: string,
    @Param('tenantId') tenantId,
    @Body() addPaymentCredentialsDto: AddPaymentCredentialsDto,
    @Res() res: any,
  ) {
    try {
      const tenant: any = await this.tenantService.addPaymentCredentials(
        superAdminId,
        tenantId,
        addPaymentCredentialsDto,
      );
      if (tenant.ok) {
        return res.status(HttpStatus.OK).json({
          statusCode: 201,
          ok: true,
          tenant: tenant.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Add Payment credentials',
          error: tenant.message,
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
  async removePaymentCredentials(
    @Param('tenantId') tenantId,
    @Param('serviceName') serviceName,
    @Res() res: any,
  ) {
    try {
      const service: any = await this.tenantService.removePaymentCredentials(
        tenantId,
        serviceName,
      );
      if (service.ok) {
        return res.status(HttpStatus.OK).json({
          statusCode: 204,
          ok: true,
          service: service.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: service.message,
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
  async getAllUsers(@Param() getTenantDto: GetTenantDto, @Res() res: any) {
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
  async getUserById(
    @Param() getTenantDto: GetTenantDto,
    @Param() getUserDto: GetUserDto,
    @Res() res: any,
  ) {
    try {
      const user: any = await this.tenantService.getUserById(
        getTenantDto,
        getUserDto,
      );
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
  async updateUserStatus(
    @Param() getTenantDto: GetTenantDto,
    @Param() getUserDto: GetUserDto,
    @Body() updateUserStatus: UpdateUserStatus,
    @Res() res: any,
  ) {
    try {
      const user: any = await this.tenantService.updateUserStatus(
        getTenantDto,
        getUserDto,
        updateUserStatus,
      );
      if (user.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          user: user.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Update User',
          error: user.error,
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
  async updateTenantStatus(
    @Param() getTenantDto: GetTenantDto,
    @Body() updateUserStatus: UpdateUserStatus,
    @Res() res: any,
  ) {
    try {
      const tenant: any = await this.tenantService.updateTenantStatus(
        getTenantDto,
        updateUserStatus,
      );
      if (tenant.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 200,
          message: 'Tenant Details Updated',
          tenant: tenant.data,
        });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: 'Error Trying to Update Tenant Status',
          error: tenant.error,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        error: 'Internal Server Error',
      });
    }
  }
}
