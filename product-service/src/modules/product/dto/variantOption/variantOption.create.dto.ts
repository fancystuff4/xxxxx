import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { SubCategoryOption, Variant } from 'src/database/entities';

export class VariantOptionCreateObj {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsUUID()
  subCatOptionId: string;

  @IsOptional()
  subCatOption: SubCategoryOption;

  @IsOptional()
  variant: Variant;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  value: string;
}

export class VariantOptionCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionCreateObj)
  options: VariantOptionCreateObj[];
}
