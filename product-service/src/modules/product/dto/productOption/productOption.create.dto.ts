import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ProductOptionCreateObj {
  @IsOptional()
  @IsUUID()
  productId: string;

  @IsUUID()
  subCatOptionId: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsArray({
    message: 'Available values for an option should be an array',
  })
  @ArrayNotEmpty({
    message: 'Available values for an option should be a non-emtpy array',
  })
  availableValues: string[];
}

export class ProductOptionCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionCreateObj)
  options: ProductOptionCreateObj[];
}
