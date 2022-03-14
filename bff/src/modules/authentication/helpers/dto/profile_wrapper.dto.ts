import { Type } from "class-transformer";
import { ProfileDto } from "./profile.dto";

export class ProfileWrapperDto {
    
    statusCode: number;

    @Type(() => ProfileDto)
    data: Set<ProfileDto>;
    
}