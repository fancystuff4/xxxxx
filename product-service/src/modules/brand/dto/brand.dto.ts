import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class BrandDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
