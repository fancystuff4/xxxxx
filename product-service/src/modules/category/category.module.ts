import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, CategoryImage } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryImage])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
