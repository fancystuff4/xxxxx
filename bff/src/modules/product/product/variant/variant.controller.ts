import { Body, Controller, Get, Post, Response, Param,Delete,Put } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantUpdateDto } from './dto/variant.dto';
import { UpdateVariantStatusDto } from './dto/variant.status.dto';
import { VariantImageCreateDto } from './dto/variant.image.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from '../../routes';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';

@Controller()
class VariantController {
    constructor(private variantService: VariantService) {}

    @Put(DESKTOP_ROUTES.VARIANT_WITH_PARAM)
    async UpdateVariantApi(
        @Body() body: VariantUpdateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Param('variantId') variantId: string,
        @Response() res: any
    ) : Promise<VariantUpdateDto> {
        const result :  any = await this.variantService.updateVariant(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @Put(DESKTOP_ROUTES.VARIANT_STATUS)
    async UpdateVariantStatusApi(
        @Param('variantId') variantId: UpdateVariantStatusDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Body() body:any,
        @Response() res: any
    ) : Promise<UpdateVariantStatusDto> {
        const result :  any = await this.variantService.updateVariantStatus(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.VARIANTS, MOBILE_ROUTES.VARIANTS])
    async GetVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariants(subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.VARIANT_WITH_PARAM, MOBILE_ROUTES.VARIANT_WITH_PARAM])
    async GetOneVariantsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @Delete(DESKTOP_ROUTES.VARIANT_WITH_PARAM)
    async DeleteVariantApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.deleteVariant(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.VARIANT_OPTIONS, DESKTOP_ROUTES.VARIANT_OPTIONS])
    async GetVariantOptionsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Body() body: any,
    ) : Promise< any> {
        
        const result :  any = await this.variantService.getVariantOptions(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @Post(DESKTOP_ROUTES.VARIANT_IMAGES)
    async AddVariantImageApi(
        @Body() body: VariantImageCreateDto,
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<VariantImageCreateDto> {
        
        const result : any = await this.variantService.addVariantImage(body,subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.VARIANT_IMAGES, MOBILE_ROUTES.VARIANT_IMAGES])
    async GetVariantImagesApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.getVariantImages(subCategoryId,productId,variantId);
        return res.status(result.statusCode).json(result);
    }

    @Delete(DESKTOP_ROUTES.VARIANT_IMAGES_WITH_PARAM)
    async DeleteVariantImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('variantId') variantId: string,
        @Param('productId') productId: string,
        @Param('imageId') imageId: string,
    ) : Promise<any> {
        
        const result : any = await this.variantService.deleteVariantImages(subCategoryId,productId,variantId,imageId);
        return res.status(result.statusCode).json(result);
    }
}
export default VariantController;