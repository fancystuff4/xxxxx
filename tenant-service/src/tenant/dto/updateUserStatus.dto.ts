import { IsNotEmpty } from 'class-validator';

export class UpdateUserStatus {
    @IsNotEmpty()
    status: boolean;
}
