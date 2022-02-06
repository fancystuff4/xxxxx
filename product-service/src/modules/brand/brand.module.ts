import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand, BrandLogo } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandLogo])],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
