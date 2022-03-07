import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put, ParseBoolPipe } from '@nestjs/common';
import { VariantService } from './variant.service';
import { HttpService } from '@nestjs/axios';
// import { BrandInputDto,CreateBrandResponseDto } from './dto/createBrand.dto';
// import { UpdateBrandDto ,UpdateBrandResponseDto} from './dto/brand.update.dto';
// import { UpdateBrandStatusDto} from './dto/brand.status.dto';
// import { GetBrandInputDto,GetBrandResponseDto } from './dto/getBrand.dto';
import { ErrorDto, ErrorResponseDto } from '../dto/error.dto';

@Controller('desktop/subCategories/:subCategoryId/products/:productId/variants')
class VariantController {
    constructor(private variantService: VariantService, private httpService: HttpService) {}

    @Put(":variantId")
    async UpdateVariantApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Param('variantId') variantId: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  ErrorResponseDto = await this.variantService.updateVariant(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Put(':variantId/active')
    async UpdateVariantStatusApi(
        @Param('variantId') variantId: string,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Body() body:any,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.variantService.updateVariantStatus(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get()
    async GetVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.variantService.getVariants(subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }
    @Get(":variantId")
    async GetOneVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.variantService.getVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':variantId')
    async DeleteVariantApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.variantService.deleteVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':variantId/options')
    async GetVariantOptionsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Body() body: any,
    ) : Promise< ErrorDto> {
        
        const result :  ErrorResponseDto = await this.variantService.getVariantOptions(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(':variantId/images')
    async AddVariantImageApi(
        @Body() body: any,
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.variantService.addVariantImage(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':variantId/images')
    async GetVariantImagesApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.variantService.getVariantImages(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }
    @Delete(':variantId/images/:imageId')
    async DeleteVariantImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.variantService.deleteVariantImages(subCategoryId,productId,variantId,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default VariantController;