import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import {
  JWT_COOKIE_CONFIG,
  TOKENS,
  AuthDto,
  PublicRoute,
  sendResponse,
} from './common';
import { RtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('/local/signup')
  async localSignUp(@Res() res, @Body() body: AuthDto) {
    const result = await this.authService.localSignUp(body);
    sendResponse(res, HttpStatus.CREATED, result);
  }

  @PublicRoute()
  @Post('/local/signin')
  async localSignIn(@Res() res: Response, @Body() body: AuthDto) {
    const tokens = await this.authService.localSignIn(body);

    res.cookie(
      TOKENS.ACCESS_TOKEN,
      tokens.access_token,
      JWT_COOKIE_CONFIG.access_token,
    );
    res.cookie(
      TOKENS.REFRESH_TOKEN,
      tokens.refresh_token,
      JWT_COOKIE_CONFIG.refresh_token,
    );

    sendResponse(res, HttpStatus.OK, tokens);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie(TOKENS.ACCESS_TOKEN);
    res.clearCookie(TOKENS.REFRESH_TOKEN);

    sendResponse(res, HttpStatus.OK);
  }

  @Get('/verify')
  verifyToken(@Res() res: Response) {
    sendResponse(res, HttpStatus.OK);
  }

  @Get('/profile')
  getProfile(@Req() req: Request, @Res() res: Response) {
    sendResponse(res, HttpStatus.OK, req.user);
  }

  @PublicRoute()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async getRefresh(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    const tokens = await this.authService.refresh(user);

    res.cookie(
      TOKENS.ACCESS_TOKEN,
      tokens.access_token,
      JWT_COOKIE_CONFIG.access_token,
    );
    res.cookie(
      TOKENS.REFRESH_TOKEN,
      tokens.refresh_token,
      JWT_COOKIE_CONFIG.refresh_token,
    );

    sendResponse(res, HttpStatus.OK, tokens);
  }
}
