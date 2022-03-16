
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    active: boolean;
}

export class CategoryUpdateDto {
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    active: boolean;
  }