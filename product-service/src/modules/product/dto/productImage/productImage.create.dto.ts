import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class ProductImageCreateObj {
  @IsNotEmpty()
  src: string;
}

export class ProductImageCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductImageCreateObj)
  images: ProductImageCreateObj[];
}
