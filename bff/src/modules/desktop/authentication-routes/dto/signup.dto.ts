import { UserDetailsDto } from "./userDetails.dto";

export class SignupDto {
    statusCode : number;
    data : UserDetailsDto
}

export class SignupResponseDto {
    statusCode: number;
    data: SignupDto;
}
