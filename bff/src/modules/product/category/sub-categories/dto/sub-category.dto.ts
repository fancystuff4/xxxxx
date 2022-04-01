import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubCatCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}

export class SubCatUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean;
  }