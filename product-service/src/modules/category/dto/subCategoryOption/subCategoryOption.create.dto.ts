import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OptionType } from 'src/database/entities/sub-category/sub-category-option.entity';

export class SubCatOptCreateObj {
  @IsNotEmpty({ message: 'optionName should be non-empty' })
  optionName: string;

  @IsArray({
    message: 'Available values for an option should be an array',
  })
  @ArrayNotEmpty({
    message: 'Available values for an option should be a non-emtpy array',
  })
  availableValues: string[];

  @IsOptional()
  @IsEnum(OptionType, {
    message: 'OptionType should be either GENERIC or COLOR',
  })
  optionType: OptionType;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class SubCatOptCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCatOptCreateObj)
  options: SubCatOptCreateObj[];
}
