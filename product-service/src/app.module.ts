import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BrandModule,
    CategoryModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
