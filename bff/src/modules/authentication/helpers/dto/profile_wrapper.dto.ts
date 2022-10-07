import { Type } from "class-transformer";
import { ProfileDto } from "./profile.dto";
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class ProfileWrapperDto {
    
    statusCode: number;

    @Type(() => ProfileDto)
    data: Set<ProfileDto>;
    
}