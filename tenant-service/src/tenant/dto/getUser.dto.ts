import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
    @IsNotEmpty()
    userId: string;
}
