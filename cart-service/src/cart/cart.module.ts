import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.respository';
import { CartService } from './cart.service';

@Module({
  imports:[],
  controllers: [CartController],
  providers: [CartService,CartRepository]
})
export class CartModule {}
