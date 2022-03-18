import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { SubCategoryModule } from './category/sub-categories/sub-category.module';
import { VariantModule } from './product/variant/variant.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [BrandModule, CategoryModule, SubCategoryModule, VariantModule, ProductModule],
    providers: [AuthenticationService, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    }]
})

export class ProductMainModule{};