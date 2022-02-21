import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  CategoryImage,
  Product,
  ProductImage,
  ProductOption,
  SubCategory,
  SubCategoryImage,
  SubCategoryOption,
  Variant,
  VariantImage,
  VariantOption,
} from 'src/database/entities';
import { SubCategoryService } from '../category/sub-category/sub-category.service';
import { CategoryService } from '../category/category.service';
import { VariantService } from './variant/variant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductOption,
      SubCategory,
      SubCategoryOption,
      SubCategoryImage,
      Category,
      CategoryImage,
      Variant,
      VariantOption,
      VariantImage,
    ]),
  ],
  providers: [
    ProductService,
    SubCategoryService,
    CategoryService,
    VariantService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
