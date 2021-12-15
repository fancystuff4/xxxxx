import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  price: number;
}
