export class LogoutDto {
    statusCode : number;
}

export class LogoutResponseDto {
    statusCode: number;
    data: LogoutDto;
}