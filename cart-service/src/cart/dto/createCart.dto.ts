import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class VariantObj{

    @IsNotEmpty()
    variantID: string

    @IsNotEmpty()
    itemID: string

    @IsNotEmpty()
    subcategoryId: string

}

export class CartDto{

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    userId:string


    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => VariantObj)
    variant: VariantObj

}




