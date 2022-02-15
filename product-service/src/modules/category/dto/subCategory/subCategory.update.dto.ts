import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class SubCatUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
