import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { OrderModule } from './modules/order/order.module';
import { ProductMainModule } from './modules/product/product_main.module';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [AuthenticationModule,ProductMainModule,OrderModule,TenantModule],
})
export class AppModule {}
