import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ProductMainModule } from './modules/product/product_main.module';

@Module({
  imports: [AuthenticationModule,ProductMainModule],
})
export class AppModule {}
