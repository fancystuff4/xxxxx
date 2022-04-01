import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVariantStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
    
}