import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  CategoryImage,
  SubCategory,
  SubCategoryImage,
  SubCategoryOption,
} from 'src/database/entities';
import { SubCategoryService } from './sub-category/sub-category.service';
import { SubCategoryController } from './sub-category/sub-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      CategoryImage,
      SubCategory,
      SubCategoryOption,
      SubCategoryImage,
    ]),
  ],
  providers: [CategoryService, SubCategoryService],
  controllers: [CategoryController, SubCategoryController],
})
export class CategoryModule {}
