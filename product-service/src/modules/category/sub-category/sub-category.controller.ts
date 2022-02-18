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
import { Category } from 'src/database/entities';
import { PaginationDto } from 'src/helpers/common-dtos';
import { ValidCategoryGuard } from 'src/helpers/common-guards';
import { EMPTY_OBJECT } from 'src/helpers/constants';
import { GetParameterFromRequest } from 'src/helpers/decorators';
import {
  insertValidationPipe,
  PipeDataType,
  sendResponse,
} from 'src/helpers/methods';
import { SubCatCreateDto, SubCatImageCreateDto, SubCatUpdateDto } from '../dto';
import {
  SubCatOptCreateDto,
  SubCatOptUpdateDto,
} from '../dto/subCategoryOption';
import { SubCategoryService } from './sub-category.service';

@Controller('categories/:id/sub-categories')
@UseGuards(ValidCategoryGuard)
export class SubCategoryController {
  constructor(private subCatService: SubCategoryService) {}

  // create sub-category
  @Post()
  async createSubCategory(
    @GetParameterFromRequest('category') category: Category,
    @Body() subCatInput: SubCatCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const subCategory = await this.subCatService.createSubCategory(
      category.id,
      subCatInput,
    );

    sendResponse(res, HttpStatus.CREATED, subCategory);
  }

  // get sub-category with id
  @Get(':subCategoryId')
  async getSubCategory(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    const subCategory = await this.subCatService.getSubCategory(
      category.id,
      subCategoryId,
    );

    sendResponse(res, HttpStatus.OK, subCategory || EMPTY_OBJECT);
  }

  // get sub-categories by category id (optionally with pagination or ids array)
  @Get()
  async getSubCategories(
    @GetParameterFromRequest('category') category: Category,
    @Query() { limit, offset, ids }: PaginationDto,
    @Res() res: Response,
  ): Promise<void> {
    const subCategories = await this.subCatService.getSubCategories(
      category.id,
      { limit, offset, ids },
    );

    sendResponse(res, HttpStatus.OK, subCategories);
  }

  // update sub-category
  @Put(':subCategoryId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateSubCategory(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Body() updateObj: SubCatUpdateDto,
    @Res() res: Response,
  ) {
    const updatedSubCat = await this.subCatService.updateSubCategory(
      category.id,
      subCategoryId,
      updateObj,
    );
    sendResponse(res, HttpStatus.OK, updatedSubCat);
  }

  // toggle active
  @Put(':subCategoryId/active')
  async toggleActiveStatus(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN))
    newActiveStatus: boolean,
    @Res() res: Response,
  ) {
    const updatedSubCategory = await this.subCatService.toggleActiveStatus(
      category.id,
      subCategoryId,
      newActiveStatus,
    );

    sendResponse(res, HttpStatus.OK, updatedSubCategory);
  }

  // delete sub-category
  @Delete(':subCategoryId')
  async deleteSubCategory(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.subCatService.deleteSubCategory(category.id, subCategoryId);

    sendResponse(res, HttpStatus.OK);
  }

  // SUB-CATEGORY OPTIONS
  // create option

  // inserts multiple options for a sub-category
  @Post(':subCategoryId/options')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createSubCatOptions(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Body() body: SubCatOptCreateDto,
    @Res() res: Response,
  ) {
    const createdOptions = await this.subCatService.createSubCatOptions(
      category.id,
      subCategoryId,
      body.options,
    );
    sendResponse(res, HttpStatus.OK, createdOptions);
  }

  // get option by id
  @Get(':subCategoryId/options/:optionId')
  async getSubCategoryById(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Res() res: Response,
  ): Promise<void> {
    const option = await this.subCatService.getSubCatOptionById(
      category.id,
      subCategoryId,
      optionId,
    );

    sendResponse(res, HttpStatus.OK, option || EMPTY_OBJECT);
  }

  // get options by sub-category id
  @Get(':subCategoryId/options')
  async getOptionsBySubCategory(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Res() res: Response,
  ) {
    const options = await this.subCatService.getOptionsBySubCategoryId(
      category.id,
      subCategoryId,
    );

    sendResponse(res, HttpStatus.OK, options);
  }

  // edit option
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':subCategoryId/options/:optionId')
  async updateSubCatOption(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Body() body: SubCatOptUpdateDto,
    @Res() res: Response,
  ) {
    const updatedOption = await this.subCatService.updateSubCategoryOption(
      category.id,
      subCategoryId,
      optionId,
      body,
    );

    sendResponse(res, HttpStatus.OK, updatedOption);
  }

  // toggle active
  @Put(':subCategoryId/options/:optionId/active')
  async toggleActive(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Body('active', insertValidationPipe(PipeDataType.BOOLEAN))
    newActiveStatus: boolean,
    @Res() res: Response,
  ): Promise<void> {
    const updatedOption = await this.subCatService.toggleActiveOfOption(
      category.id,
      subCategoryId,
      optionId,
      newActiveStatus,
    );

    sendResponse(res, HttpStatus.OK, updatedOption);
  }

  // delete option
  @Delete(':subCategoryId/options/:optionId')
  async deleteSubCategoryOption(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('optionId', insertValidationPipe(PipeDataType.UUID))
    optionId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.subCatService.deleteSubCategoryOption(
      category.id,
      subCategoryId,
      optionId,
    );

    sendResponse(res, HttpStatus.OK);
  }

  // IMAGES
  // create image
  @Post(':subCategoryId/images')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async insertSubCategoryImage(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Body() body: SubCatImageCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.subCatService.addSubCategoryImages(
      category.id,
      subCategoryId,
      body.images,
    );

    sendResponse(res, HttpStatus.OK, images);
  }

  // get image
  @Get(':subCategoryId/images/:imageId')
  async getSubCategoryImageById(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID))
    imageId: string,
    @Res() res: Response,
  ): Promise<void> {
    const image = await this.subCatService.getSubCategoryImageById(
      category.id,
      subCategoryId,
      imageId,
    );

    sendResponse(res, HttpStatus.OK, image || EMPTY_OBJECT);
  }

  // get images by sub-category id
  @Get(':subCategoryId/images')
  async getImagesBySubCategoryId(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    const images = await this.subCatService.getImagesBySubCatId(
      category.id,
      subCategoryId,
    );

    sendResponse(res, HttpStatus.OK, images);
  }

  // edit image
  // @UsePipes(new ValidationPipe({ whitelist: true }))

  // delete image
  @Delete(':subCategoryId/images/:imageId')
  async deleteSubCategoryImageById(
    @GetParameterFromRequest('category') category: Category,
    @Param('subCategoryId', insertValidationPipe(PipeDataType.UUID))
    subCategoryId: string,
    @Param('imageId', insertValidationPipe(PipeDataType.UUID))
    imageId: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.subCatService.deleteSubCategoryImageById(
      category.id,
      subCategoryId,
      imageId,
    );

    sendResponse(res, HttpStatus.OK);
  }
}
