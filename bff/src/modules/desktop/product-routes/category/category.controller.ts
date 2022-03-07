import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put, ParseBoolPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { HttpService } from '@nestjs/axios';
// import { BrandInputDto,CreateBrandResponseDto } from './dto/createBrand.dto';
// import { UpdateBrandDto ,UpdateBrandResponseDto} from './dto/brand.update.dto';
// import { UpdateBrandStatusDto} from './dto/brand.status.dto';
// import { GetBrandInputDto,GetBrandResponseDto } from './dto/getBrand.dto';
import { ErrorDto, ErrorResponseDto } from './dto/error.dto';

@Controller('desktop/category')
class CategoryController {
    constructor(private categoryService: CategoryService, private httpService: HttpService) {}

    @Post()
    async CreateCategoryApi(
        @Body() body: any,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.createCategory(body);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':id')
    async GetOneCategoryApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.getOneCategory(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get()
    async GetCategoriesApi(
        @Response() res: any
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.categoryService.getCategories();
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':id')
    async DeleteCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.categoryService.deleteCategory(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id')
    async UpdateCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Body() body: any,
    ) : Promise< ErrorDto> {
        
        const result : ErrorResponseDto = await this.categoryService.updateCategory(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id/status')
    async UpdateCategoryStatusApi(
        @Body() body: any,
        @Response() res: any,
        @Param('id') id: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.categoryService.updateCategoryStatus(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(':id/images')
    async AddCategoryImageApi(
        @Body() body: any,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.addCategoryImage(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':id/images/:imageId')
    async GetOneCategoryImageApi(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.getOneCategoryImage(id,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':id/images')
    async GetCategoryImagesApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.getCategoryImages(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':id/images/:imageId')
    async UpdateCategoryImageApi(
        @Param('id') id: string,
        @Body() body: any,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.updateCategoryImage(body,id,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':id/images/:imageId')
    async DeleteCategoryImageApi(
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.categoryService.deleteCategoryImage(id,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default CategoryController;