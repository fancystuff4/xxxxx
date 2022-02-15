import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OptionType } from 'src/database/entities/sub-category/sub-category-option.entity';
import { AddOrReplace } from 'src/helpers/constants';

export class SubCatOptUpdateDto {
  @IsOptional()
  @IsNotEmpty({ message: 'optionName should be non-empty' })
  optionName: string;

  @IsOptional()
  @IsArray({
    message: 'Available values for an option should be an array',
  })
  @ArrayNotEmpty({
    message: 'Available values for an option should be a non-emtpy array',
  })
  @IsString({
    each: true,
  })
  availableValues: string[];

  @IsOptional()
  @IsEnum(AddOrReplace)
  addOrReplace: AddOrReplace;

  @IsOptional()
  @IsEnum(OptionType, {
    message: 'OptionType should be either GENERIC or COLOR',
  })
  optionType: OptionType;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
