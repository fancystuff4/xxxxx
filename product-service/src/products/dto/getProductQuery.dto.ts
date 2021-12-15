import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  limit: number;

  @IsString()
  @IsOptional()
  startKey: string;
}
