import { IsNotEmpty } from 'class-validator';

export class PaymentServiceDto{
    @IsNotEmpty()
    superAdminId: string;
}
