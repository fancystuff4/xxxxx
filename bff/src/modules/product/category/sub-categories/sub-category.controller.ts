import { Body, Controller, Get, Post, Response, Param,Delete,Put } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCatCreateDto,SubCatUpdateDto } from './dto/sub-category.dto';
import { UpdateSubCatStatusDto } from './dto/sub-category.status.dto';
import { SubCatImageCreateDto } from './dto/sub-category.image.dto';
import { SubCatOptCreateDto, SubCatOptUpdateDto } from './dto/sub-category.option.dto';
import { UpdateSubCatOptionStatusDto } from './dto/sub-category.option.status.dto';
import { DESKTOP_ROUTES } from '../../routes';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';

@Controller()
class SubCategoryController {

    constructor(private subCategoryService: SubCategoryService) {}

    @Post(DESKTOP_ROUTES.SUB_CATEGORY_WITH_NO_PARAM)
    async CreateSubCategoryApi(
        @Body() body: SubCatCreateDto,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< SubCatCreateDto> {
        const result :  any = await this.subCategoryService.createSubCategory(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM)
    async GetOneSubCategoryApi(
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.subCategoryService.getOneSubCategory(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.SUB_CATEGORY_WITH_NO_PARAM)
    async GetSubCategoriesApi(
        
        @Param('id') id: string,
        @Response() res: any,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.getSubCategories(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM)
    async DeleteSubCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.deleteSubCategory(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.SUB_CATEGORY_WITH_PARAM)
    async UpdateSubCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
        @Body() body: SubCatUpdateDto,
    ) : Promise< any> {
        
        const result : any = await this.subCategoryService.updateSubCategory(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.SUB_CATEGORY_STATUS)
    async UpdateSubCategoryStatusApi(
        @Body() body: UpdateSubCatStatusDto,
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.updateSubCategoryStatus(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(DESKTOP_ROUTES.OPTION_WITH_NO_PARAM)
    async CreateSubCategoryOptionsApi(
        @Body() body: SubCatOptCreateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< SubCatOptCreateDto> {
        const result :  any = await this.subCategoryService.addSubCategoryOption(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.OPTION_WITH_PARAM)
    async GetOneSubCategoryOptionApi(
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Param('optionId') optionId: string,
        @Response() res: any,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.getSubCategoryOption(id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.OPTION_WITH_NO_PARAM)
    async getSubCategoryOptionsApi(
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.getSubCategoryOptions(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.OPTION_WITH_NO_PARAM)
    async UpdateSubCategoryOptionApi(
        @Body() body: SubCatOptUpdateDto,
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<SubCatOptUpdateDto> {
        
        const result : any = await this.subCategoryService.updateSubCategoryOption(body,id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.OPTION_STATUS)
    async UpdateSubCategoryOptionStatusApi(
        @Body() body: UpdateSubCatOptionStatusDto,
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<UpdateSubCatOptionStatusDto> {
        
        const result : any = await this.subCategoryService.updateSubCategoryOptionStatus(body,id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(DESKTOP_ROUTES.OPTION_WITH_PARAM)
    async DeleteSubCategoryOptionApi(
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<any> {
        
        const result : any = await this.subCategoryService.deleteSubCategoryOption(id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_NO_PARAM)
    async AddSubCategoryImageApi(
        @Body() body: SubCatImageCreateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< SubCatImageCreateDto> {
        const result :  any = await this.subCategoryService.addSubCategoryImage(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_PARAM)
    async GetOneSubCategoryImageApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise< any> {
        const result :  any = await this.subCategoryService.getSubCategoryImage(id,subCategoryId,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_NO_PARAM)
    async GetSubCategoryImagesApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< any> {
        const result :  any = await this.subCategoryService.getSubCategoryImages(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(DESKTOP_ROUTES.SUB_CATEGORY_IMAGE_WITH_PARAM)
    async DeleteSubCategoryImageApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< any> {
        const result :  any = await this.subCategoryService.deleteSubCategoryImage(id,subCategoryId,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default SubCategoryController;