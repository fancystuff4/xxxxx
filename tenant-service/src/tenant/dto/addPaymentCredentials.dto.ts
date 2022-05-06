import { IsNotEmpty,IsArray } from 'class-validator';

export class AddPaymentCredentialsDto {
    @IsNotEmpty()
    paymentService: string;
    
    @IsNotEmpty()
    @IsArray()
    paymentProperties: string[];

    @IsNotEmpty()
    @IsArray()
    paymentPropertyValues: string[];


    
}
