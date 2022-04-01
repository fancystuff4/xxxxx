import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryImageCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    src: string;
}

export class CategoryImageUpdateDto {
    @IsNotEmpty()
    @ApiProperty()
    src: string;
  }

