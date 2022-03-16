import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductImageCreateObj {
    @ApiProperty()
    @IsNotEmpty()
    src: string;
}

export class ProductImageCreateDto {
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ProductImageCreateObj)
    images: ProductImageCreateObj[];
}
