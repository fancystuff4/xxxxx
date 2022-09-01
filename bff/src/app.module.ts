import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ProductMainModule } from './modules/product/product_main.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthenticationModule,
    ProductMainModule,
    OrderModule,
    CartModule,
    TenantModule,
    UserModule,
  ],
})
export class AppModule {}
