import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class VariantImageCreateObj {
  @IsNotEmpty()
  src: string;
}

export class VariantImageCreateDto {
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => VariantImageCreateObj)
    images: VariantImageCreateObj[];
}
