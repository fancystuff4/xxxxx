import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import VariantController from './variant.controller';
import { VariantService } from './variant.service';

@Module({
    imports: [HttpModule],
    controllers: [VariantController],
    providers: [VariantService]
})

export class VariantModule{};