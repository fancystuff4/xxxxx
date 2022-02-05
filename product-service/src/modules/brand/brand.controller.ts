import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Brand } from 'src/database/entities';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { BrandService } from './brand.service';
import { BrandDto, UpdateBrandDto } from './dto';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  async createBrand(
    @Res() res: Response,
    @Body() brand: BrandDto,
  ): Promise<void> {
    const newBrand = await this.brandService.createBrand(brand);

    sendResponse(res, HttpStatus.CREATED, newBrand);
  }

  @Get(':id')
  async getOneBrand(
    @Param('id') brandId: string,
    @Res() res: Response,
  ): Promise<void> {
    const brand: Brand = await this.brandService.getOneBrand(brandId);

    sendResponse(res, HttpStatus.OK, brand || EMPTY_OBJECT);
  }

  @Get()
  async getBrands(
    @Res() res: Response,
    @Query() { limit, offset }: PaginationDto,
  ): Promise<void> {
    const brands = await this.brandService.getBrands(limit, offset);

    sendResponse(res, HttpStatus.OK, brands);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateOneBrand(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Body() body: UpdateBrandDto,
  ): Promise<void> {
    const updatedBrand: Brand = await this.brandService.updateOneBrand(
      brandId,
      body,
    );

    sendResponse(res, HttpStatus.OK, updatedBrand || EMPTY_OBJECT);
  }

  @Put()
  updateMultipleBrands() {
    return;
  }

  @Put(':id/active')
  async toggleActive(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN))
    active: boolean,
  ) {
    await this.brandService.toggleActive(brandId, active);

    sendResponse(res, HttpStatus.OK);
  }

  @Delete(':id')
  async deleteBrands(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
  ): Promise<void> {
    await this.brandService.deleteBrands(brandId);

    sendResponse(res, HttpStatus.OK);
  }
}
