import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  offset: number;

  @IsOptional()
  @ApiProperty()
  
  @IsArray({
    message: 'ids query paramater should an array of UUIDs',
  })
  ids: string[];
}
