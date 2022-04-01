import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/modules/authentication/authentication.service";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";

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
          const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);

        if (isPublicRoute) return true;

        const request = context.switchToHttp().getRequest();
        const requestedHeader = {
            'authorization' : `${request.headers.authorization}`
        }
        return this.authenticationService.getProfile(requestedHeader).then(response => {
            if(!requiredRoles){
                return true;
            }
            return requiredRoles.some((role) =>response.data.role?.includes(role));

        })
        
    }

}