import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class SubCatImageCreateObj {
  @IsNotEmpty()
  src: string;
}

export class SubCatImageCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SubCatImageCreateObj)
  images: SubCatImageCreateObj[];
}
