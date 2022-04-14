import {Type } from 'class-transformer';
import { IsArray, IsDateString, IsDefined, IsIn, IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';

export class ProductDetailsDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    category: string;
    
    @IsNotEmpty()
    price: number;
}

export class CreateOrderDto{
    @ValidateNested({ each: true })
    @Type(() => ProductDetailsDto)
    @IsDefined()
    @IsArray()
    productDetails: [ProductDetailsDto];

    @IsNotEmpty()
    quantity: number;

    @IsDateString()
    @IsNotEmpty()
    orderDate: Date;
    
    @IsNotEmpty()
    @IsIn(["success","failed"])
    paymentStatus: string;
        
    @IsNotEmpty()
    @IsIn(['placed' , 'outForDelivery' , 'delivered'])
    orderStatus: 'placed' | 'outForDelivery' | 'delivered';
}

