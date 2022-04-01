import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubCatStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
    
}