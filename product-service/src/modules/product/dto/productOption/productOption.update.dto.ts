import { ArrayNotEmpty, IsArray, IsEnum, IsUUID } from 'class-validator';
import { OPTION_ACTION_TYPES } from 'src/helpers/constants';

export class ProductOptionUpdateDto {
  @IsUUID()
  subCatOptionId: string;

  @IsArray({
    message: 'values should be an array',
  })
  @ArrayNotEmpty({
    message: 'values should be a non-emtpy array',
  })
  values: string[];

  @IsEnum(OPTION_ACTION_TYPES, {
    message: "'actionType' value should be either 'ADD' or 'REMOVE'",
  })
  actionType: OPTION_ACTION_TYPES;
}
