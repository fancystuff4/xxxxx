import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from 'src/database/entities';

@Module({
  imports:[TypeOrmModule.forFeature([Brand])],
  providers: [BrandService],
  controllers: [BrandController]
})
export class BrandModule {}
