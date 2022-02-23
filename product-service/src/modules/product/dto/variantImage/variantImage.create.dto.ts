import { Type } from 'class-transformer';
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
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VariantImageCreateObj)
  images: VariantImageCreateObj[];
}
