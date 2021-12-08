import { IsEmpty, IsNegative, IsNotEmpty, IsNumber } from "class-validator";
import { ProductCatetory, ProductStatus } from "./Product.enum";

export class ProductCreateDto {
    id: string
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    @IsNumber()
    price: number
    category: ProductCatetory
    status: ProductStatus
}