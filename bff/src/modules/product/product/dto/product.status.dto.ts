import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
    
}