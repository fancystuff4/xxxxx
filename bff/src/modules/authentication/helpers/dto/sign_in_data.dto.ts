import { ApiProperty } from '@nestjs/swagger';
export class SignInDataDto {
    @ApiProperty()
    access_token : string;

    @ApiProperty()
    refresh_token : string;
}