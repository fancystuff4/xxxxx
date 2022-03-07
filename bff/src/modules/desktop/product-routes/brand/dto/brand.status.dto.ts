import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateBrandStatusDto {

    @IsBoolean()
    @IsNotEmpty()
    active: boolean
    
}

