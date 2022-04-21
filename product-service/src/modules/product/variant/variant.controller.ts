import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Product } from 'src/database/entities';
import { ValidateProductGuard } from 'src/helpers/common-guards';
import { GetParameterFromRequest } from 'src/helpers/decorators';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { VariantUpdateDto } from '../dto/variant';
import { VariantImageCreateDto } from '../dto/variantImage';
import { ProductService } from '../product.service';
import { VariantService } from './variant.service';

@Controller('subCategories/:subCategoryId/products/:productId/variants')
@UseGuards(ValidateProductGuard)
export class VariantController {
  constructor(private variantService: VariantService) {}

  @Put(':variantId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateVariant(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
    @Body() body: VariantUpdateDto,
  ): Promise<void> {
    const updatedVariant = await this.variantService.editVariant(
      product.id,
      variantId,
      body,
    );

    sendResponse(res, HttpStatus.OK, updatedVariant);
  }

  @Put(':variantId/active')
  async toggleVariantActive(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN)) active: boolean,
  ): Promise<void> {
    const variant = await this.variantService.toggleVariantActiveStatus(
      product.id,
      variantId,
      active,
    );

    sendResponse(res, HttpStatus.OK, variant);
  }

  // get variants by product id
  @Get('')
  async getVariantsByProductId(
    @GetParameterFromRequest('product') product: Product,
    @Res() res: Response,
  ): Promise<void> {
    const variants = await this.variantService.getVariants(product.id);

    sendResponse(res, HttpStatus.OK, variants);
  }
  // get one variant by id
  @Get(':variantId')
  async getVariantById(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
  ): Promise<void> {
    const variant = await this.variantService.getSingleVariant(product.id, variantId);
    sendResponse(res, HttpStatus.OK, variant);
  }

  // delete variant by id
  @Delete(':variantId')
  async deleteVariantById(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.variantService.deleteVariantById(product.id, variantId);

    sendResponse(res, HttpStatus.OK);
  }

  // get variant options by variant id
  @Get(':variantId/options')
  async getVariantOptionsByVariantId(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
  ): Promise<void> {
    const options = await this.variantService.getVariantOptionsByVariantId(
      product.id,
      variantId,
    );

    sendResponse(res, HttpStatus.OK, options);
  }

  // add variant images
  @Post(':variantId/images')
  async addVariantImages(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Body() body: VariantImageCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.variantService.addVariantImages(
      product.id,
      variantId,
      body.images,
    );

    sendResponse(res, HttpStatus.OK, images);
  }

  // get variant images by variant id
  @Get(':variantId/images')
  async getImagesByVariantId(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.variantService.getImagesByVariantId(
      product.id,
      variantId,
    );

    sendResponse(res, HttpStatus.OK, images);
  }

  // delete variant images by image id
  @Delete(':variantId/images/:imageId')
  async deleteVariantImageById(
    @GetParameterFromRequest('product') product: Product,
    @Param('variantId', insertValidationPipe(PipeDataType.UUID))
    variantId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID))
    imageId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.variantService.deleteVariantImageById(
      product.id,
      variantId,
      imageId,
    );

    sendResponse(res, HttpStatus.OK);
  }
}
