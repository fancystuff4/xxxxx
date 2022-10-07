import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCatCreateDto, SubCatUpdateDto } from './dto/sub-category.dto';
import { UpdateSubCatStatusDto } from './dto/sub-category.status.dto';
import { SubCatImageCreateDto } from './dto/sub-category.image.dto';
import {
  SubCatOptCreateDto,
  SubCatOptUpdateDto,
} from './dto/sub-category.option.dto';
import { UpdateSubCatOptionStatusDto } from './dto/sub-category.option.status.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from '../../routes';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from 'src/modules/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Product SubCategory')
@Controller()
@UseGuards(AuthGuard)
class SubCategoryController {
  constructor(
    private subCategoryService: SubCategoryService,
    private filesService: FilesService,
  ) {}

  @Roles(Role.Tenant)
  @Post(DESKTOP_ROUTES.SUB_CATEGORIES)
  async CreateSubCategoryApi(
    @Body() body: SubCatCreateDto,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<SubCatCreateDto> {
    const result: any = await this.subCategoryService.createSubCategory(
      body,
      id,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([
    DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM,
    MOBILE_ROUTES.SUB_CATEGORY_WITH_PARAM,
  ])
  async GetOneSubCategoryApi(
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getOneSubCategory(
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([DESKTOP_ROUTES.SUB_CATEGORIES, MOBILE_ROUTES.SUB_CATEGORIES])
  async GetSubCategoriesApi(
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getSubCategories(id);
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Delete(DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM)
  async DeleteSubCategoryApi(
    @Response() res: any,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<any> {
    const result: any = await this.subCategoryService.deleteSubCategory(
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Put(DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM)
  async UpdateSubCategoryApi(
    @Response() res: any,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
    @Body() body: SubCatUpdateDto,
  ): Promise<any> {
    const result: any = await this.subCategoryService.updateSubCategory(
      body,
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Put(DESKTOP_ROUTES.SUB_CATEGORY_STATUS)
  async UpdateSubCategoryStatusApi(
    @Body() body: UpdateSubCatStatusDto,
    @Response() res: any,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<any> {
    const result: any = await this.subCategoryService.updateSubCategoryStatus(
      body,
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Post(DESKTOP_ROUTES.OPTIONS)
  async CreateSubCategoryOptionsApi(
    @Body() body: SubCatOptCreateDto,
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<SubCatOptCreateDto> {
    const result: any = await this.subCategoryService.addSubCategoryOption(
      body,
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([DESKTOP_ROUTES.OPTION_WITH_PARAM, MOBILE_ROUTES.OPTION_WITH_PARAM])
  async GetOneSubCategoryOptionApi(
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Param('optionId') optionId: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getSubCategoryOption(
      id,
      subCategoryId,
      optionId,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([DESKTOP_ROUTES.OPTIONS, MOBILE_ROUTES.OPTIONS])
  async getSubCategoryOptionsApi(
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getSubCategoryOptions(
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Put(DESKTOP_ROUTES.OPTIONS)
  async UpdateSubCategoryOptionApi(
    @Body() body: SubCatOptUpdateDto,
    @Response() res: any,
    @Param('optionId') optionId: string,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<SubCatOptUpdateDto> {
    const result: any = await this.subCategoryService.updateSubCategoryOption(
      body,
      id,
      subCategoryId,
      optionId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Put(DESKTOP_ROUTES.OPTION_STATUS)
  async UpdateSubCategoryOptionStatusApi(
    @Body() body: UpdateSubCatOptionStatusDto,
    @Response() res: any,
    @Param('optionId') optionId: string,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<UpdateSubCatOptionStatusDto> {
    const result: any =
      await this.subCategoryService.updateSubCategoryOptionStatus(
        body,
        id,
        subCategoryId,
        optionId,
      );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Delete(DESKTOP_ROUTES.OPTION_WITH_PARAM)
  async DeleteSubCategoryOptionApi(
    @Response() res: any,
    @Param('optionId') optionId: string,
    @Param('id') id: string,
    @Param('subCategoryId') subCategoryId: string,
  ): Promise<any> {
    const result: any = await this.subCategoryService.deleteSubCategoryOption(
      id,
      subCategoryId,
      optionId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Post(DESKTOP_ROUTES.SUB_CATEGORY_IMAGES)
  @UseInterceptors(FileInterceptor('file'))
  async AddSubCategoryImageApi(
    @UploadedFile() file,
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<SubCatImageCreateDto> {
    const imageUrl = await this.filesService.uploadFile(file);

    const imageUrlObj = {
      images: [
        {
          src: imageUrl,
        },
      ],
    };

    const result: any = await this.subCategoryService.addSubCategoryImage(
      imageUrlObj,
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([
    DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_PARAM,
    MOBILE_ROUTES.SUB_CATEGORY_IMAGE_WITH_PARAM,
  ])
  async GetOneSubCategoryImageApi(
    @Body() body: any,
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getSubCategoryImage(
      id,
      subCategoryId,
      imageId,
    );
    return res.status(result.statusCode).json(result);
  }

  @PublicRoute()
  @Get([DESKTOP_ROUTES.SUB_CATEGORY_IMAGES, MOBILE_ROUTES.SUB_CATEGORY_IMAGES])
  async GetSubCategoryImagesApi(
    @Body() body: any,
    @Param('subCategoryId') subCategoryId: string,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.getSubCategoryImages(
      id,
      subCategoryId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Roles(Role.Tenant)
  @Delete(DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_PARAM)
  async DeleteSubCategoryImageApi(
    @Body() body: any,
    @Param('subCategoryId') subCategoryId: string,
    @Param('imageId') imageId: string,
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<any> {
    const result: any = await this.subCategoryService.deleteSubCategoryImage(
      id,
      subCategoryId,
      imageId,
    );
    return res.status(result.statusCode).json(result);
  }
}
export default SubCategoryController;
