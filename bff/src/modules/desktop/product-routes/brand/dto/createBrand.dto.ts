import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class BrandInputDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class CreateBrandResponseDto {
  statusCode: number;
  data: BrandInputDto;
}
