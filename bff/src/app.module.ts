import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CartModule } from './modules/cart/cart.module';
import { FilesModule } from './modules/files/files.module';
import { OrderModule } from './modules/order/order.module';
import { ProductMainModule } from './modules/product/product_main.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthenticationModule,
    ProductMainModule,
    OrderModule,
    TenantModule,
    CartModule,
    UserModule,
    FilesModule
  ],
})
export class AppModule {}
