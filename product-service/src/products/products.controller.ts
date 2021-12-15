import {
  Controller,
  Body,
  HttpStatus,
  Res,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductQueryDto } from './dto/getProductQuery.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './products.service';
import { sendResponse } from '../helpers/utils';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: any,
  ) {
    const newProduct = {
      id: uuid(),
      title: createProductDto.title,
      category: createProductDto.category,
      price: createProductDto.price,
    };

    await this.productService.createProduct(newProduct);

    const createdProduct = await this.productService.getProductById(
      newProduct.id,
    );

    sendResponse(res, HttpStatus.CREATED, createdProduct.Item);
  }

  @Get()
  async getProducts(@Res() res: any, @Query() query: GetProductQueryDto) {
    const { limit: Limit, startKey } = query;
    const products = await this.productService.getProducts({
      Limit,
      startKey,
    });

    sendResponse(res, HttpStatus.OK, products);
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: any,
  ) {
    const product = await this.productService.getProductById(id);

    if (product.Item) {
      sendResponse(res, HttpStatus.OK, product.Item);
    } else {
      throw new BadRequestException('Product does not exist.');
    }
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string, @Res() res: any) {
    const result = await this.productService.deleteProductById(id);

    if (result.Attributes) {
      sendResponse(res, HttpStatus.OK);
    } else {
      throw new BadRequestException('Product is not found to delete');
    }
  }

  @Patch(':id')
  async updateProduct(
    @Body() reqBody: UpdateProductDto,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, reqBody);

    sendResponse(res, HttpStatus.OK, updatedProduct.Attributes);
  }
}
