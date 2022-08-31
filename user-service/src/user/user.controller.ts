import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserParamsDto, UserProfileDto } from './common';
import { UserService } from './user.service';
import { sendResponse } from './common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('profile/users/:userId/tenants/:tenantId')
  addProfile(
    @Param() params: UserParamsDto,
    @Res() res: Response,
    @Body() body: UserProfileDto,
  ) {
    const result = this.userService.addProfile(params, body);
    sendResponse(res, HttpStatus.CREATED, result);
  }

  @Get('profile/users/:userId/tenants/:tenantId')
  async getProfile(@Param() params: UserParamsDto, @Res() res: Response) {
    const result = await this.userService.getProfile(params);
    sendResponse(res, HttpStatus.OK, result.Items);
  }

  @Patch('profile/users/:userId/tenants/:tenantId')
  async updateProfile(
    @Param() params: UserParamsDto,
    @Res() res: Response,
    @Body() body: UserProfileDto,
  ) {
    const result = await this.userService.updateProfile(params, body);
    sendResponse(res, HttpStatus.OK, result);
  }

  @Patch('profile/address/users/:userId/tenants/:tenantId')
  async updateAddress(
    @Param() params: UserParamsDto,
    @Res() res: Response,
    @Body() body: any,
  ) {
    const result = await this.userService.updateProfileAddress(params, body);
    sendResponse(res, HttpStatus.OK, result);
  }

  @Delete('profile/address/users/:userId/tenants/:tenantId/address/:addressId')
  async deleteAddressById(@Param() params: any, @Res() res: Response) {
    const result = await this.userService.deleteProfileAddressById(params);
    sendResponse(res, HttpStatus.OK, result);
  }

  @Patch(
    'profile/address/default/users/:userId/tenants/:tenantId/address/:addressId',
  )
  async updateDefaultAddressById(@Param() params: any, @Res() res: Response) {
    const result = await this.userService.updateDefaultProfileAddressById(
      params,
    );
    sendResponse(res, HttpStatus.OK, result);
  }
}
