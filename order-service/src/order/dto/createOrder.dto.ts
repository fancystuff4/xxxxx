import { IsNotEmpty } from 'class-validator';
import { ProductDetailsDto } from './productDetails.dto';

export class CreateOrderDto {
    @IsNotEmpty()
    productDetails: ProductDetailsDto;
    
    @IsNotEmpty()
    quantity: number;
    
    @IsNotEmpty()
    orderDate: number;
    
    @IsNotEmpty()
    paymentStatus: 'success' | 'failed';
        
    @IsNotEmpty()
    orderStatus: 'placed' | 'outForDelivery' | 'delivered';
}