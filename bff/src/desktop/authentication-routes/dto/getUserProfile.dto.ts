import { UserDetailsDto } from "./userDetails.dto";

export class GetUserProfileDto {
    statusCode : number;
    data : UserDetailsDto;
}

export class GetUserProfileResponseDto {
    statusCode: number;
    data: GetUserProfileDto;
}