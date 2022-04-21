import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class VariantObj{

    @ApiProperty()
    @IsNotEmpty()
    variantID: string

    @ApiProperty()
    @IsNotEmpty()
    itemID: string

    @IsNotEmpty()
    subcategoryId: string

}

export class AddToCartDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => VariantObj)
    variant: VariantObj

}




