import { IsNumber,IsBoolean,IsNotEmpty } from 'class-validator';

export class UpdateTenantDto {

    @IsNotEmpty()
    fullname: string;
    
    @IsNotEmpty()
    fulladdress: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    @IsNumber()
    pin: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}
