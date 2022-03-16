import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [AuthenticationModule,ProductModule],
})
export class AppModule {}
