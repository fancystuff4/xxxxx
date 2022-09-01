import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product/product.service';
import { VariantService } from '../product/product/variant/variant.service';
import OrderController from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService, AuthenticationService, CartService, VariantService],
})
export class OrderModule {}
