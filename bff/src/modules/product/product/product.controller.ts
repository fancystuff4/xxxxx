import { Body, Controller, Get, Post, Response, Param,Delete,Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.dto';
import { UpdateProductStatusDto } from './dto/product.status.dto';
import { ProductImageCreateDto } from './dto/product.image.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from '../routes';
import { PaginationDto } from './dto/product.paginate.dto';
import { PublicRoute } from 'src/common/decorators/publicRoute.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller()
@UseGuards(AuthGuard)
class ProductController {
    constructor(private productService: ProductService) {}

    @Roles(Role.Tenant)
    @Post(DESKTOP_ROUTES.PRODUCTS)
    async CreateProductApi(
        @Body() body: ProductCreateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise< ProductCreateDto> {
        const result :  any = await this.productService.createProduct(body,subCategoryId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.PRODUCT_WITH_PARAM, MOBILE_ROUTES.PRODUCT_WITH_PARAM])
    async GetOneProductApi(
        @Param('productId') productId: string,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise<any> {
        const result :  any = await this.productService.getOneProduct(subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.PRODUCTS, MOBILE_ROUTES.PRODUCTS])
    async GetProductsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<any> {
        
        const result : any = await this.productService.getProducts(subCategoryId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.PRODUCT_PAGINATE, MOBILE_ROUTES.PRODUCT_PAGINATE])
    async GetProductsByIdsApi(
        @Response() res: any,
        @Query() { limit, offset, ids }: PaginationDto,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<any> {
        const result : any = await this.productService.getProductsByIds(subCategoryId,limit,offset,ids);
        return res.status(result.statusCode).json(result);
    }

    @Roles(Role.Tenant)
    @Delete(DESKTOP_ROUTES.PRODUCT_WITH_PARAM)
    async DeleteProductApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.productService.deleteProduct(subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @Roles(Role.Tenant)
    @Put(DESKTOP_ROUTES.PRODUCT_STATUS)
    async UpdateProductStatusApi(
        @Body() body: UpdateProductStatusDto,
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<UpdateProductStatusDto> {
        
        const result : any = await this.productService.updateProductStatus(body,subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @Roles(Role.Tenant)
    @Post(DESKTOP_ROUTES.PRODUCT_IMAGES)
    async AddProductImagesApi(
        @Body() body: ProductImageCreateDto,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Response() res: any
    ) : Promise< ProductImageCreateDto> {
        const result :  any = await this.productService.addProductImages(body,subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.PRODUCT_IMAGES, MOBILE_ROUTES.PRODUCT_IMAGES])
    async GetProductImagesApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.productService.getProductImages(subCategoryId,productId);
        return res.status(result.statusCode).json(result);
    }

    @PublicRoute()
    @Get([DESKTOP_ROUTES.PRODUCT_IMAGE_WITH_PARAM, MOBILE_ROUTES.PRODUCT_IMAGE_WITH_PARAM])
    async GetOneProductImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.productService.getOneProductImage(subCategoryId,productId,imageId);
        return res.status(result.statusCode).json(result);
    }

    @Roles(Role.Tenant)
    @Delete(DESKTOP_ROUTES.PRODUCT_IMAGE_WITH_PARAM)
    async DeleteProductImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('productId') productId: string,
    ) : Promise<any> {
        
        const result : any = await this.productService.deleteProductImage(subCategoryId,productId,imageId);
        return res.status(result.statusCode).json(result);
    }
}
export default ProductController;