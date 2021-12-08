import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';

import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule,MongooseModule.forRoot(MONGO_CONNECTION)]
})
export class AppModule {}
