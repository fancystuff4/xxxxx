import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put, ParseBoolPipe } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { HttpService } from '@nestjs/axios';
// import { BrandInputDto,CreateBrandResponseDto } from './dto/createBrand.dto';
// import { UpdateBrandDto ,UpdateBrandResponseDto} from './dto/brand.update.dto';
// import { UpdateBrandStatusDto} from './dto/brand.status.dto';
// import { GetBrandInputDto,GetBrandResponseDto } from './dto/getBrand.dto';
import { ErrorDto, ErrorResponseDto } from '../dto/error.dto';

@Controller('desktop/categories/:id/sub-categories')
class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService, private httpService: HttpService) {}

    @Post()
    async CreateSubCategoryApi(
        @Body() body: any,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.createSubCategory(body,id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':subCategoryId')
    async GetOneSubCategoryApi(
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.getOneSubCategory(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get()
    async GetSubCategoriesApi(
        
        @Param('id') id: string,
        @Response() res: any,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.subCategoryService.getSubCategories(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':subCategoryId')
    async DeleteSubCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.subCategoryService.deleteSubCategory(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':subCategoryId')
    async UpdateSubCategoryApi(
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
        @Body() body: any,
    ) : Promise< ErrorDto> {
        
        const result : ErrorResponseDto = await this.subCategoryService.updateSubCategory(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':subCategoryId/active')
    async UpdateSubCategoryStatusApi(
        @Body() body: any,
        @Response() res: any,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.subCategoryService.updateSubCategoryStatus(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(':subCategoryId/options')
    async CreateSubCategoryOptionsApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.addSubCategoryOption(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(":subCategoryId/options/:optionId")
    async GetOneSubCategoryOptionApi(
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Param('optionId') optionId: string,
        @Response() res: any,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.subCategoryService.getSubCategoryOption(id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(":subCategoryId/options")
    async getSubCategoryOptionsApi(
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.subCategoryService.getSubCategoryOptions(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':subCategoryId/options/:optionId')
    async UpdateSubCategoryOptionApi(
        @Body() body: any,
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.subCategoryService.updateSubCategoryOption(body,id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':subCategoryId/options/:optionId/active')
    async UpdateSubCategoryOptionStatusApi(
        @Body() body: any,
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.subCategoryService.updateSubCategoryOptionStatus(body,id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':subCategoryId/options/:optionId')
    async DeleteSubCategoryOptionApi(
        @Response() res: any,
        @Param('optionId') optionId: string,
        @Param('id') id: string,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.subCategoryService.deleteSubCategoryOption(id,subCategoryId,optionId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(":subCategoryId/images")
    async AddSubCategoryImageApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.addSubCategoryImage(body,id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(":subCategoryId/images/:imageId")
    async GetOneSubCategoryImageApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Param('imageId') imageId: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.getSubCategoryImage(id,subCategoryId,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(":subCategoryId/images")
    async GetSubCategoryImagesApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.getSubCategoryImages(id,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(":subCategoryId/images/:imageId")
    async DeleteSubCategoryImageApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('id') id: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.subCategoryService.deleteSubCategoryImage(id,subCategoryId,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default SubCategoryController;