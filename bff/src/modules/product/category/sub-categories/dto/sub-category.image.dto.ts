import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class SubCatImageCreateObj {
    @ApiProperty()
    @IsNotEmpty()
    src: string;
}

export class SubCatImageCreateDto {
    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SubCatImageCreateObj)
    images: SubCatImageCreateObj[];
}
