import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from './Product.repository';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/Product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Product.name,schema: ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService,ProductRepository]
})
export class ProductsModule {}
