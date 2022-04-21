import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductMainModule } from './modules/product/product_main.module';

@Module({
  imports: [AuthenticationModule, ProductMainModule, CartModule],
})
export class AppModule {}
