import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import CategoryController from './category/category.controller';
import { CategoryService } from './category/category.service';
import SubCategoryController from './category/sub-categories/sub-category.controller';
import { SubCategoryService } from './category/sub-categories/sub-category.service';
import BrandController from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import ProductController from './product/product.controller';
import { ProductService } from './product/product.service';
import VariantController from './product/variant/variant.controller';
import { VariantService } from './product/variant/variant.service';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
    imports: [HttpModule],
    controllers: [CategoryController,SubCategoryController,BrandController,ProductController,VariantController],
    providers: [CategoryService,SubCategoryService,BrandService,ProductService,VariantService,AuthenticationService, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }]
})

export class ProductModule{};