import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BrandInputDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  active: boolean;
}

export class UpdateBrandDto {
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  active: boolean
}


