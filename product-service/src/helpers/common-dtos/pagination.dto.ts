import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    limit: number

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    offset: number
}