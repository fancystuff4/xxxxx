import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
