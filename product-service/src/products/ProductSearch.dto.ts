import { ProductStatus } from "./Product.enum";

export interface ProductSearchDto {
    status : ProductStatus
    title: string
}