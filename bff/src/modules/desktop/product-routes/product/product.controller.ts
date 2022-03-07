import { Body, Controller, Get, Post, Response, Request,Param,Delete,Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { HttpService } from '@nestjs/axios';
// import { BrandInputDto,CreateBrandResponseDto } from './dto/createBrand.dto';
// import { UpdateBrandDto ,UpdateBrandResponseDto} from './dto/brand.update.dto';
// import { UpdateBrandStatusDto} from './dto/brand.status.dto';
// import { GetBrandInputDto,GetBrandResponseDto } from './dto/getBrand.dto';
import { ErrorDto, ErrorResponseDto } from './dto/error.dto';

@Controller('desktop/subCategories/:subCategoryId/products')
class ProductController {
    constructor(private productService: ProductService, private httpService: HttpService) {}

    @Post()
    async CreateProductApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.productService.createProduct(body,subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':productId')
    async GetOneProductApi(
        @Param('productId') productId: string,
        @Param('subCategoryId') subCategoryId: string,
        @Response() res: any
    ) : Promise<ErrorDto> {
        const result :  ErrorResponseDto = await this.productService.getOneProduct(subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get()
    async GetProductsApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.productService.getProducts(subCategoryId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':productId')
    async DeleteProductApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.productService.deleteProduct(subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }

    

    @Put(':productId/active')
    async UpdateProductStatusApi(
        @Body() body: any,
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<void> {
        
        const result : ErrorResponseDto = await this.productService.updateProductStatus(body,subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }

    @Post(':productId/images')
    async AddProductImagesApi(
        @Body() body: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
        @Response() res: any
    ) : Promise< ErrorDto> {
        const result :  ErrorResponseDto = await this.productService.addProductImages(body,subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':productId/images')
    async GetProductImagesApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.productService.getProductImages(subCategoryId,productId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get(':productId/images/:imageId')
    async GetOneProductImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.productService.getOneProductImage(subCategoryId,productId,imageId);
        return res.status(result.statusCode).json(result.data);
    }

    @Delete(':productId/images/:imageId')
    async DeleteProductImageApi(
        @Response() res: any,
        @Param('subCategoryId') subCategoryId: string,
        @Param('imageId') imageId: string,
        @Param('productId') productId: string,
    ) : Promise<ErrorDto> {
        
        const result : ErrorResponseDto = await this.productService.deleteProductImage(subCategoryId,productId,imageId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default ProductController;