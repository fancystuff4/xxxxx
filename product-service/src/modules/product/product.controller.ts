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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Product, SubCategory } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  ValidateProductGuard,
  ValidateSubCategoryGuard,
} from 'src/helpers/common-guards';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import { GetParameterFromRequest } from 'src/helpers/decorators';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import {
  ProductCreateDto,
  ProductOptionCreateObj,
  ProductOptionUpdateDto,
  ProductImageCreateDto,
} from './dto';
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
    @Body() body: ProductCreateDto,
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
  // add product option
  @Post(':productId/options')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(ValidateProductGuard)
  async addProductOption(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @GetParameterFromRequest('product') product: Product,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Body() body: ProductOptionCreateObj,
    @Res() res: Response,
  ): Promise<void> {
    const updatedProduct = await this.productService.addProductOption(
      subCategory.id,
      productId,
      body,
      product,
    );

    sendResponse(res, HttpStatus.OK, updatedProduct);
  }

  // add/ remove value to/ from existing product option
  @Put(':productId/options/:optionId')
  @UseGuards(ValidateProductGuard)
  async addOrRemoveExistingOptionValues(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @GetParameterFromRequest('product') product: Product,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Body() body: ProductOptionUpdateDto,
    @Res() res: Response,
  ): Promise<void> {
    const variants =
      await this.productService.addOrRemoveValueFromProductOption(
        subCategory.id,
        productId,
        body,
        product,
      );

    sendResponse(res, HttpStatus.OK, variants);
  }
  // get product options by product id
  // get product option by option id
  // update product option
  // toggle product option active
  // delete product option
  @Delete(':productId/options/:optionId')
  @UseGuards(ValidateProductGuard)
  async removeProductOption(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @GetParameterFromRequest('product') product: Product,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Res() res: Response,
  ): Promise<void> {
    const updatedProduct = await this.productService.removeProductOption(
      subCategory.id,
      productId,
      optionId,
      product,
    );

    sendResponse(res, HttpStatus.OK, updatedProduct);
  }
  ////////////////////// IMAGES ///////////////////////
  // create product image
  @Post(':productId/images')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addProductImages(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Body() body: ProductImageCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.productService.addProductImages(
      subCategory.id,
      productId,
      body.images,
    );

    sendResponse(res, HttpStatus.OK, images);
  }
  // get product images by product id
  @Get(':productId/images')
  async getImagesByProductId(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.productService.getImagesByProductId(
      subCategory.id,
      productId,
    );

    sendResponse(res, HttpStatus.OK, images);
  }
  // get product image by image id
  @Get(':productId/images/:imageId')
  async getProductImageById(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID))
    imageId: string,
    @Res() res: Response,
  ): Promise<void> {
    const image = await this.productService.getProductImageById(
      subCategory.id,
      productId,
      imageId,
    );

    sendResponse(res, HttpStatus.OK, image || EMPTY_OBJECT);
  }

  // delete product image
  @Delete(':productId/images/:imageId')
  async deleteProductImageById(
    @GetParameterFromRequest('subCategory') subCategory: SubCategory,
    @Param('productId', insertValidationPipe(PipeDataType.UUID))
    productId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID))
    imageId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productService.deleteProductImageById(
      subCategory.id,
      productId,
      imageId,
    );

    sendResponse(res, HttpStatus.OK);
  }
}
