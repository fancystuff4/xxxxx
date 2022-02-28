class RefreshTokenDataDto {
    access_token : string;
    refresh_token : string;
}

export class GetRefreshTokenDto {
    statusCode : number;
    data : RefreshTokenDataDto;
}

export class GetRefreshTokenResponseDto {
    statusCode: number;
    data: GetRefreshTokenDto;
}
