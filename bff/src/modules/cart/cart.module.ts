import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { ProductService } from '../product/product/product.service';
import { VariantService } from '../product/product/variant/variant.service';
import CartController from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [HttpModule],
    controllers: [CartController],
    providers: [
        CartService,
        AuthenticationService,
        ProductService,
        VariantService
    ]
})

export class CartModule{};