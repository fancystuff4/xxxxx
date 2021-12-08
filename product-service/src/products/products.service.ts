import { Injectable } from '@nestjs/common';
import { ProductCatetory, ProductStatus } from './Product.enum';
import {v1 as uuid} from 'uuid';
import { ProductSearchDto } from './ProductSearch.dto';
import { ProductUpdateDto } from './ProductUpdate.dto';
import { ProductCreateDto } from './ProductCreate.dto';
import { Product } from './schemas/Product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepository } from './Product.repository';

@Injectable()
export class ProductsService {

    constructor(private productRepository: ProductRepository){

    }

    async getAllProducts(): Promise<Product[]>{
        return await this.productRepository.findAll();
    }

    async createProduct(productCreatDto : ProductCreateDto): Promise<Product>{
       
        return await this.productRepository.create(productCreatDto);

    }

    // productSearch(productSearchDto : ProductSearchDto){
    //     const {status, title} = productSearchDto;
    //     let products = this.getAllProducts();
    //     console.log(status)
    //     if(status){
    //         products = products.filter(product => product.status === status)
    //     }
    //     if(title){
    //         products= products.filter(product=> product.title.includes(title));
    //     }
    //     console.log(products);
    //     return products;
        
    // }

    // getProductById(id: string): Product {

    //     const products = this.getAllProducts();
    //     return products.find(product=> product.id===id);
    // }

    // updateProduct(productUpdateDto: ProductUpdateDto): Product {
    //     const {id, description} = productUpdateDto;
    //     let product = this.getProductById(id);
    //     product.description = description;
    //     return product;
    // }

    // deleteProduct(id: string){
    //     let products = this.getAllProducts();
    //     this.products = products.filter(product =>  product.id !==id)
    //     return (this.products.length !== products.length)
    // }
}
