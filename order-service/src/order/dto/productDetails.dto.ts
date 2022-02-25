import { IsNotEmpty } from 'class-validator';

export class ProductDetailsDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    category: string;
    
    @IsNotEmpty()
    price: number;
}