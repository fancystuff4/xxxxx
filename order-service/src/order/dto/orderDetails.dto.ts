import { ProductDetailsDto } from "./productDetails.dto";

export class OrderDetailsDto {
    id: string;
    customerId: string;
    productDetails: ProductDetailsDto;
    quantity: number;
    orderDate: number;
    paymentStatus: 'success' | 'failed';
    orderStatus: 'placed' | 'outForDelivery' | 'delivered';
}