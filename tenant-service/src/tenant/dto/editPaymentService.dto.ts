import {  IsNotEmpty,IsArray } from 'class-validator';

export class EditPaymentServiceDto {
    @IsNotEmpty()
    newPaymentPropertyName: string;

    @IsNotEmpty()
    newPaymentPropertyValue:string;


    
}