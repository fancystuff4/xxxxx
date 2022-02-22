import {  IsNotEmpty,IsArray } from 'class-validator';

export class AddPaymentServiceDto {
    @IsNotEmpty()
    @IsArray()
    paymentProperties: string[];

    @IsNotEmpty()
    paymentService:string;


    
}