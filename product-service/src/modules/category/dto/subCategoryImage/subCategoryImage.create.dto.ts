import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class SubCatImageCreateObj {
  @IsNotEmpty()
  src: string;
}

export class SubCatImageCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubCatImageCreateObj)
  images: SubCatImageCreateObj[];
}
