import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateBrandDto {
    @IsOptional()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsBoolean()
    active: boolean
}

export class UpdateBrandResponseDto {
    statusCode: number;
    data: UpdateBrandDto;
  }