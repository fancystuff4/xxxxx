import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class SubCatCreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  description: string;
}
