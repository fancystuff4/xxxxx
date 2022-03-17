import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AuthGuard } from 'src/common/guards/auth.guard';
import BrandController from './brand.controller';
import { BrandService } from './brand.service';

@Module({
    imports: [HttpModule],
    controllers: [BrandController],
    providers: [BrandService]
})

export class BrandModule { };