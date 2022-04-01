import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubCatOptionStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
    
}