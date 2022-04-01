import { Module } from '@nestjs/common';

import BrandController from './brand.controller';
import { BrandService } from './brand.service';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';

@Module({
    controllers: [BrandController],
    providers: [BrandService, AuthenticationService]
})

export class BrandModule { };