import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class UpdateCartDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
