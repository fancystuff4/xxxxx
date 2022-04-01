import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class optionsObj{
    @IsNotEmpty()
    name: string


    @IsNotEmpty()
    type: number | string

    @IsNotEmpty()
    value: number | string
    
}

export class variantObj{
    @IsNotEmpty()
    variantID: string

    @IsNotEmpty()
    itemID: string


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => optionsObj)
    options:optionsObj[]
}

export class cartDto{
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    userId:string


    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => variantObj)
    variant: variantObj


}

export class AddToCartDto{
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => cartDto)
    cartData:cartDto

    @IsUUID()
    @IsNotEmpty()
    userId:string
}




