// TO_DO PRODUCT UPDATE
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { SubCategory } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import { ValidateSubCategoryGuard } from 'src/helpers/common-guards';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import { GetParameterFromRequest } from 'src/helpers/decorators';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { ProductAndOptionCreateDto } from './dto';
import { ProductService } from './product.service';

@Controller('subCategories/:subCategoryId/products')
@UseGuards(ValidateSubCategoryGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  ///////////////////// PRODUCTS ///////////////////
  // create product
  @Post('')
  async createProduct(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Res() res: Response,
    @Body() body: ProductAndOptionCreateDto,
  ): Promise<void> {
    const newProduct = await this.productService.createProduct(
      subCategory.id,
      body,
    );

    sendResponse(res, HttpStatus.OK, newProduct);
  }

  // get product by id
  @Get(':productId')
  async getProductById(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Res() res: Response,
  ): Promise<void> {
    const [product] = await this.productService.getProductsByIds(
      subCategory.id,
      [productId],
    );

    sendResponse(res, HttpStatus.OK, product || EMPTY_OBJECT);
  }

  // get products by filtering ids or pagination
  @Get('')
  async getProductsByIds(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Res() res: Response,
    @Query() { limit, offset, ids }: PaginationDto,
  ): Promise<void> {
    const products = await this.productService.getProducts(subCategory.id, {
      limit,
      offset,
      ids,
    });
    sendResponse(res, HttpStatus.OK, products);
  }

  // update product
  // toggle product active status
  @Put(':productId/active')
  async toggleProductActiveStatus(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Res() res: Response,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN)) active: boolean,
  ): Promise<void> {
    const product = await this.productService.toggleProductActive(
      subCategory.id,
      productId,
      active,
    );

    sendResponse(res, HttpStatus.OK, product);
  }

  // delete product
  @Delete(':productId')
  async deleteproductById(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productService.deleteProduct(subCategory.id, productId);
    sendResponse(res, HttpStatus.OK);
  }
  //////////////////// OPTIONS ///////////////////
  // create product option
  // get product options by product id
  // get product option by option id
  // update product option
  // toggle product option active
  // delete product option
  ////////////////////// IMAGES ///////////////////////
  // create product image
  // get product images by product id
  // get product image by image id
  // delete product image
}
