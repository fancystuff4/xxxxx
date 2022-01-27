import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { handleTokenVerifation } from '../common';

@Injectable()
export class RtGuard extends AuthGuard('rt-jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any, ctx: any): any {
    handleTokenVerifation(err, user, info);
  }
}
