import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication-routes/authentication.module';
import { BrandModule } from './product-routes/brand/brand.module';
import { CategoryModule } from './product-routes/category/category.module';
import { SubCategoryModule } from './product-routes/category/sub-categories/sub-category.module';
import { ProductModule } from './product-routes/product/product.module';
import { VariantModule } from './product-routes/product/variant/variant.module';


@Module({
    imports: [AuthenticationModule,BrandModule,CategoryModule,SubCategoryModule,ProductModule,VariantModule]
})

export class DesktopModule{};