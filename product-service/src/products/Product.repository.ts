import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductCreateDto } from "./ProductCreate.dto";
import { Product, ProductDocument } from "./schemas/Product.schema";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){

    }

    async create(createProductDTO: ProductCreateDto): Promise<Product>{
        let product = new this.productModel(createProductDTO);
        return await product.save()
    }
    async findAll(): Promise<Product[]>{
        return await this.productModel.find();
    }
}