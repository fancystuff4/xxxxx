import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JWT_COOKIE_CONFIG, TOKENS, AuthDto, PublicRoute } from './common';
import { RtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('/local/signup')
  async localSignUp(@Res() res, @Body() body: AuthDto) {
    await this.authService.localSignUp(body);
    res.send('Successfully created');
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

    res.json(tokens);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    res.clearCookie(TOKENS.ACCESS_TOKEN);
    res.clearCookie(TOKENS.REFRESH_TOKEN);

    res.send('ok');
  }

  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
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

    res.json(tokens);
  }
}
