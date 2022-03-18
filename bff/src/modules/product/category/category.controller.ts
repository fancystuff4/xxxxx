import { Body, Controller, Get, Post, Response, Param,Delete,Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto,CategoryUpdateDto } from './dto/category.dto';
import { UpdateCategoryStatusDto } from './dto/category.status.dto';
import { CategoryImageCreateDto, CategoryImageUpdateDto } from './dto/category.image.dto';
import { DESKTOP_ROUTES } from '../routes';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';

@Controller()
class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post(DESKTOP_ROUTES.CATEGORY_WITH_NO_PARAM)
    async CreateCategoryApi(
        @Body() body: CategoryCreateDto,
        @Response() res: any
    ) : Promise<CategoryCreateDto> {
        const result :  any = await this.categoryService.createCategory(body);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.CATEGORY_WITH_PARAM)
    async GetOneCategoryApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.categoryService.getOneCategory(id);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.CATEGORY_WITH_NO_PARAM)
    async GetCategoriesApi(
        @Response() res: any
    ) : Promise<any> {
        
        const result : any = await this.categoryService.getCategories();
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(DESKTOP_ROUTES.CATEGORY_WITH_PARAM)
    async DeleteCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<any> {
        
        const result : any = await this.categoryService.deleteCategory(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.CATEGORY_WITH_PARAM)
    async UpdateCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Body() body: CategoryUpdateDto,
    ) : Promise<any> {
        
        const result : any = await this.categoryService.updateCategory(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.CATEGORY_STATUS)
    async UpdateCategoryStatusApi(
        @Body() body: UpdateCategoryStatusDto,
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<UpdateCategoryStatusDto> {
        
        const result : any = await this.categoryService.updateCategoryStatus(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(DESKTOP_ROUTES.CATEGORY_IMAGE_WITH_NO_PARAM)
    async AddCategoryImageApi(
        @Body() body: CategoryImageCreateDto,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< CategoryImageCreateDto> {
        const result :  any = await this.categoryService.addCategoryImage(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.CATEGORY_IMAGE_WITH_PARAM)
    async GetOneCategoryImageApi(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.categoryService.getOneCategoryImage(id,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @PublicRoute()
    @Get(DESKTOP_ROUTES.CATEGORY_IMAGE_WITH_NO_PARAM)
    async GetCategoryImagesApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.categoryService.getCategoryImages(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(DESKTOP_ROUTES.CATEGORY_IMAGE_WITH_PARAM)
    async UpdateCategoryImageApi(
        @Param('id') id: string,
        @Body() body: CategoryImageUpdateDto,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<CategoryImageUpdateDto> {
        const result :  any = await this.categoryService.updateCategoryImage(body,id,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(DESKTOP_ROUTES.CATEGORY_IMAGE_WITH_PARAM)
    async DeleteCategoryImageApi(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.categoryService.deleteCategoryImage(id,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default CategoryController;