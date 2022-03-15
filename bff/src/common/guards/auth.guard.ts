import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/modules/authentication/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector, 
        private readonly authenticationService: AuthenticationService
    ) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const isPublicRoute = this.reflector.getAllAndOverride('isPublicRoute', [
            context.getHandler(),
            context.getClass(),
          ]);
        if (isPublicRoute) return true;

        const request = context.switchToHttp().getRequest();
        const requestedHeader = {
            'authorization' : `${request.headers.authorization}`
        }
        return this.authenticationService.verifyToken(requestedHeader).then(response => {
            return true;
        })
        
    }

}