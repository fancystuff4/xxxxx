import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryCreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
