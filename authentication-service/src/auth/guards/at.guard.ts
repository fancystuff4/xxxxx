import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { handleTokenVerifation } from '../common';

@Injectable()
export class AuthorizationGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublicRoute = this.reflector.getAllAndOverride('isPublicRoute', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublicRoute) return true;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, ctx: any): any {
    handleTokenVerifation(err, user, info);
  }
}
