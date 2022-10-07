import { Type } from "class-transformer";
import { SignInDataDto } from "./sign_in_data.dto";
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class SignInWrapperDto {

    statusCode: number;

    @Type(() => SignInDataDto)
    data: Set<SignInDataDto>;
    
}