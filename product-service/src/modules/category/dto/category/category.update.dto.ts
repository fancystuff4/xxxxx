import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
