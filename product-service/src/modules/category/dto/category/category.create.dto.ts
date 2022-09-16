import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
