import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { INTERNAL, throwError } from '../methods';
import { HttpStatus } from '@nestjs/common';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      const asArray = JSON.parse(value);
      return asArray;
    } catch (error) {
      throwError({
        errMsg: 'ids should be an array of UUIDs',
        errOrigin: INTERNAL,
        errCode: HttpStatus.BAD_REQUEST,
      });
    }
  })
  @IsArray({
    message: 'ids query paramater should an array of UUIDs',
  })
  ids: string[];
}
