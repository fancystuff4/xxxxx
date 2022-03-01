class SigninDataDto {
    access_token : string;
    refresh_token : string;
}

export class SigninDto {
    statusCode : number;
    data : SigninDataDto;
}

export class SigninResponseDto {
    statusCode: number;
    data: SigninDto;
}