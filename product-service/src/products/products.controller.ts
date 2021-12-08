import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductCategoryValidationPipe } from 'src/product-category-validation.pipe';

import { ProductCreateDto } from './ProductCreate.dto';
import { ProductsService } from './products.service';
import { ProductSearchDto } from './ProductSearch.dto';
import { ProductUpdateDto } from './ProductUpdate.dto';
import { Product } from './schemas/Product.schema';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){

    }

    @Get()
    async getAllProducts(@Query() param: ProductSearchDto): Promise<Product[]>{

        
        // if(Object.keys(param).length){
        //     console.log('filter',param);
        //     return this.productsService.productSearch(param)
        // } else {
        //     console.log('no filter');
        //     return this.productsService.getAllProducts();
        // }
        return await this.productsService.getAllProducts()
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UsePipes(new ProductCategoryValidationPipe())
    async createProduct(@Body() productCreateDto: ProductCreateDto): Promise<Product>{
        return await this.productsService.createProduct(productCreateDto);

    }

    // @Get('/:id')
    // getProductById(@Param("id") id : string) {
    //     return this.productsService.getProductById(id);
    // }

    // @Put('/:id')
    // updateProduct(@Param('id') id: string,@Body() productUpdateDto:ProductUpdateDto): Product {
    //     productUpdateDto.id=id;
    //     return this.productsService.updateProduct(productUpdateDto)
    // }

    // @Delete('/:id')
    // @HttpCode(204)
    // deleteProduct(@Param('id') id : string) {
    //      if(!this.productsService.deleteProduct(id)){
    //         throw new NotFoundException('Product does not exists');
    //      }

    // }
}
