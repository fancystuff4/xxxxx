import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class optionsObj{
    @ApiProperty()
    @IsNotEmpty()
    name: string


    @ApiProperty()
    @IsNotEmpty()
    type: number | string

    @ApiProperty()
    @IsNotEmpty()
    value: number | string
    
}

export class variantObj{
    @ApiProperty()
    @IsNotEmpty()
    variantID: string

    @ApiProperty()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    itemID: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => optionsObj)
    options:optionsObj[]
}

export class AddToCartDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    userId:string


    @ApiProperty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => variantObj)
    variant: variantObj


}




