import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROUTES } from './helpers/routes';
import { UserService } from './user.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserProfileAddressDto } from './helpers/dto/userAddress.dto';

@ApiTags('user')
@Controller('user')
class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) {}

  @Post(ROUTES.PROFILE)
  async addProfile(
    @Body() body: any,
    @Request() req: any,
    @Response() res: any,
  ): Promise<any> {
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.addProfile(userId, tenantId, body);
    return res.status(result.statusCode).json(result);
  }

  @Get(ROUTES.PROFILE)
  async getProfile(@Request() req: any, @Response() res: any): Promise<any> {
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.getProfile(userId, tenantId);
    return res.status(result.statusCode).json(result);
  }

  @Patch(ROUTES.PROFILE)
  async updateProfile(
    @Body() body: any,
    @Request() req: any,
    @Response() res: any,
  ) {
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.updateProfile(userId, tenantId, body);
    return res.status(result.statusCode).json(result);
  }

  @Patch(ROUTES.ADDRESS)
  async updateProfileAddress(
    @Body() body: UserProfileAddressDto,
    @Request() req: any,
    @Response() res: any,
  ) {
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.updateProfileAddress(
      userId,
      tenantId,
      body,
    );
    return res.status(result.statusCode).json(result);
  }

  @Delete(ROUTES.ADDRESS_ID)
  async deleteProfileAddressById(
    @Request() req: any,
    @Response() res: any,
    @Param() params: any,
  ) {
    const { addressId } = params;
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.daleteProfileAddressById(
      userId,
      tenantId,
      addressId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Patch(ROUTES.ADDRESS_ID_DEFAULT)
  async updateProfileAddressById(
    @Request() req: any,
    @Response() res: any,
    @Param() params: any,
  ) {
    const { addressId } = params;
    let userId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      userId = response.data.username;
      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const result = await this.userService.updateDefaultProfileAddressById(
      userId,
      tenantId,
      addressId,
    );
    return res.status(result.statusCode).json(result);
  }
}

export default UserController;
