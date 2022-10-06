import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { FilesService } from 'src/modules/files/files.service';
import ProductController from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, AuthenticationService, FilesService],
  exports: [ProductService],
})
export class ProductModule {}
