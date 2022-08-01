import { Module } from '@nestjs/common';
import TenantController from './tenant.controller';
import { TenantService } from './tenant.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
    controllers: [TenantController],
    providers: [TenantService,AuthenticationService]
})

export class TenantModule{};