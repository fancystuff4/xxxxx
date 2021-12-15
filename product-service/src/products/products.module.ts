import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
})
export class ProductsModule {}
