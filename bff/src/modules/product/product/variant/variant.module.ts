import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import VariantController from './variant.controller';
import { VariantService } from './variant.service';

@Module({
    controllers: [VariantController],
    providers: [VariantService, AuthenticationService]
})

export class VariantModule{};