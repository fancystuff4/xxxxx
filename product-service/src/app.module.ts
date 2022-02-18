import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Brand,
  BrandLogo,
  Category,
  CategoryImage,
  SubCategoryImage,
  SubCategoryOption,
  SubCategory,
  Product,
  ProductImage,
  ProductOption,
  Variant,
  VariantImage,
  VariantOption,
} from './database/entities';
@Module({
  imports: [
    BrandModule,
    CategoryModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'multitenant-product-db',
      entities: [
        Brand,
        BrandLogo,
        Category,
        CategoryImage,
        SubCategory,
        SubCategoryImage,
        SubCategoryOption,
        Product,
        ProductImage,
        ProductOption,
        Variant,
        VariantImage,
        VariantOption,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
