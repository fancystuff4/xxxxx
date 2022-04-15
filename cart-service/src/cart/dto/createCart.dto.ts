import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OptionsObj{
    @IsNotEmpty()
    name: string


    @IsNotEmpty()
    type: number | string

    @IsNotEmpty()
    value: number | string
    
}

export class VariantObj{
    @IsNotEmpty()
    variantID: string

    @IsNotEmpty()
    itemID: string


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OptionsObj)
    options:OptionsObj[]
}

export class CartDto{

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    userId:string


    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => VariantObj)
    variant: VariantObj

}




