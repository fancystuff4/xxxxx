import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    active: boolean
    
}

