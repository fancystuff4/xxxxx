export class ErrorDto {
    statusCode: number;
    message: [string]; 
    error: string;
}

export class ErrorResponseDto {
    statusCode: number;
    data: ErrorDto;
}