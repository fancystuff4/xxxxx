// export interface Product {
//     id: string,
//     title: string,
//     description: string,
//     price: number,
//     category: ProductCatetory,
//     status: ProductStatus
// }

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ProductCatetory, ProductStatus } from "../Product.enum"

export type ProductDocument = Product & Document
@Schema()
export class Product {

    @Prop()
    id: string
    @Prop({required: true})
    title: string
    @Prop({required: true})
    description: string
    @Prop({required: true})
    price: number
    @Prop()
    category: ProductCatetory
    @Prop()
    status: ProductStatus
}

export const ProductSchema = SchemaFactory.createForClass(Product);