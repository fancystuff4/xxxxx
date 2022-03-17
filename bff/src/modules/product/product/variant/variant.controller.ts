import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { VariantService } from './variant.service';
import { HttpService } from '@nestjs/axios';
import { VariantUpdateDto } from './dto/variant.dto';
import { UpdateVariantStatusDto } from './dto/variant.status.dto';
import { VariantImageCreateDto } from './dto/variant.image.dto';
import { DESKTOP_ROUTES } from '../../routes';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller()
class VariantController {
    constructor(private variantService: VariantService, private httpService: HttpService) {}

    @UseGuards(AuthGuard)
    @Put(DESKTOP_ROUTES.VARIANT_WITH_PARAM)
    async UpdateVariantApi(
        @Body() body: VariantUpdateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Param('variantId') variantId: string,
        @Response() res: any
    ) : Promise<VariantUpdateDto> {
        const result :  any = await this.variantService.updateVariant(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @UseGuards(AuthGuard)
    @Put(DESKTOP_ROUTES.VARIANT_STATUS)
    async UpdateVariantStatusApi(
        @Param('variantId') variantId: UpdateVariantStatusDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Body() body:any,
        @Response() res: any
    ) : Promise<UpdateVariantStatusDto> {
        const result :  any = await this.variantService.updateVariantStatus(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(DESKTOP_ROUTES.VARIANT_WITH_NO_PARAM)
    async GetVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariants(subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }
    @Get(DESKTOP_ROUTES.VARIANT_WITH_NO_PARAM)
    async GetOneVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @UseGuards(AuthGuard)
    @Delete(DESKTOP_ROUTES.VARIANT_WITH_PARAM)
    async DeleteVariantApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.deleteVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(DESKTOP_ROUTES.VARIANT_OPTIONS)
    async GetVariantOptionsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Body() body: any,
    ) : Promise< any> {
        
        const result :  any = await this.variantService.getVariantOptions(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @UseGuards(AuthGuard)
    @Post(DESKTOP_ROUTES.VARIANT_IMAGES_WITH_NO_PARAM)
    async AddVariantImageApi(
        @Body() body: VariantImageCreateDto,
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<VariantImageCreateDto> {
        
        const result : any = await this.variantService.addVariantImage(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(DESKTOP_ROUTES.VARIANT_IMAGES_WITH_NO_PARAM)
    async GetVariantImagesApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariantImages(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result.data);
    }

    @UseGuards(AuthGuard)
    @Delete(DESKTOP_ROUTES.VARIANT_IMAGES_WITH_PARAM)
    async DeleteVariantImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.deleteVariantImages(subCategoryId,productId,variantId,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default VariantController;