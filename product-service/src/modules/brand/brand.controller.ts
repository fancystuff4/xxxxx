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
import { Brand, BrandLogo } from 'src/database/entities';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import { PaginationDto } from 'src/helpers/common-dtos';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { BrandService } from './brand.service';
import {
  BrandDto,
  BrandLogoCreateDto,
  BrandLogoUpdateDto,
  UpdateBrandDto,
} from './dto';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  // APIs for Brand properties other than its logo
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

  // Brand APIs for its logos
  @Post(':id/logos')
  async addNewLogo(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Body() body: BrandLogoCreateDto,
  ): Promise<void> {
    const newLogo: BrandLogo = await this.brandService.addNewLogo(
      brandId,
      body,
    );

    sendResponse(res, HttpStatus.CREATED, newLogo);
  }

  // sends all the logos if 'ids' array is not sent in the query
  // if 'ids' is sent, only the logos with those id are sent;
  @Get(':id/logos')
  async getLogos(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Query('logoids') logoIds: string[],
  ): Promise<void> {
    const logos = await this.brandService.getLogos(brandId, logoIds);

    sendResponse(res, HttpStatus.OK, logos);
  }

  @Put(':id/logos/:logoId')
  async updateLogo(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Param('logoId', insertValidationPipe(PipeDataType.UUID))
    logoId: string,
    @Body() body: BrandLogoUpdateDto,
  ): Promise<void> {
    const updatedLogo: BrandLogo = await this.brandService.updateLogo(
      brandId,
      logoId,
      body,
    );
    sendResponse(res, HttpStatus.OK, updatedLogo);
  }

  @Delete(':id/logos/:logoId')
  async deleteLogo(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID))
    brandId: string,
    @Param('logoId', insertValidationPipe(PipeDataType.UUID))
    logoId: string,
  ): Promise<void> {
    await this.brandService.deleteLogo(brandId, logoId);
    sendResponse(res, HttpStatus.OK);
  }
}
