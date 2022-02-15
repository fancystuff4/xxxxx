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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { Category } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { CategoryService } from './category.service';
import {
  CategoryCreateDto,
  CategoryImageCreateDto,
  CategoryUpdateDto,
  CategoryImageUpdateDto,
} from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  // Add category
  @Post()
  async addCategory(
    @Res() res: Response,
    @Body() body: CategoryCreateDto,
  ): Promise<void> {
    const newCategory = await this.categoryService.addCategory(body);

    sendResponse(res, HttpStatus.OK, newCategory);
  }

  // Get one category
  @Get(':id')
  async getOneCategory(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
  ): Promise<void> {
    const category = await this.categoryService.getOneCategory(categoryId);
    sendResponse(res, HttpStatus.OK, category || EMPTY_OBJECT);
  }

  // Get categories with optional pagination & filtering ids
  @Get()
  async getCategories(
    @Res() res: Response,
    @Query() { limit, offset, ids }: PaginationDto,
  ): Promise<void> {
    const categories = await this.categoryService.getCategories({
      limit,
      offset,
      ids,
    });

    sendResponse(res, HttpStatus.OK, categories);
  }

  // Update category
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateCategory(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Body() body: CategoryUpdateDto,
  ): Promise<void> {
    const updatedCategory: Category = await this.categoryService.updateCategory(
      categoryId,
      body,
    );
    sendResponse(res, HttpStatus.OK, updatedCategory);
  }

  // toggleActiveStatus
  @Put(':id/status')
  async toggleActiveStatus(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN))
    setActive: boolean,
  ): Promise<void> {
    const updatedCategory = await this.categoryService.toggleActiveStatus(
      categoryId,
      setActive,
    );
    sendResponse(res, HttpStatus.OK, updatedCategory);
  }

  // Remove category
  @Delete(':id')
  async deleteCategory(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
  ): Promise<void> {
    await this.categoryService.deleteCategory(categoryId);
    sendResponse(res, HttpStatus.OK);
  }

  // Category image related APIs
  // Add image
  @Post(':id/images')
  async addImage(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Body() body: CategoryImageCreateDto,
  ): Promise<void> {
    const newCategoryImage = await this.categoryService.addImage(
      categoryId,
      body,
    );
    sendResponse(res, HttpStatus.OK, newCategoryImage);
  }

  // Get one image
  @Get(':id/images/:imageId')
  async getImage(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID)) imageId: string,
  ): Promise<void> {
    const image = await this.categoryService.getOneImage(categoryId, imageId);
    sendResponse(res, HttpStatus.OK, image || EMPTY_OBJECT);
  }

  // Get images with optional pagination and filtering ids
  // without any valid query params, it will return the all the images
  // of the category
  @Get(':id/images')
  async getImages(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Query('ids', insertValidationPipe(PipeDataType.OPTIONAL_ARRAY))
    imageIds: string[],
  ): Promise<void> {
    const images = await this.categoryService.getImages(categoryId, imageIds);
    sendResponse(res, HttpStatus.OK, images);
  }

  // Update image
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id/images/:imageId')
  async updateImage(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID)) imageId: string,
    @Body() body: CategoryImageUpdateDto,
  ): Promise<void> {
    const updatedImage = await this.categoryService.updateImage(
      categoryId,
      imageId,
      body,
    );
    sendResponse(res, HttpStatus.OK, updatedImage);
  }

  // Delete image
  @Delete(':id/images/:imageId')
  async deleteImage(
    @Res() res: Response,
    @Param('id', insertValidationPipe(PipeDataType.UUID)) categoryId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID)) imageId: string,
  ): Promise<void> {
    await this.categoryService.deleteImage(categoryId, imageId);
    sendResponse(res, HttpStatus.OK);
  }
}
