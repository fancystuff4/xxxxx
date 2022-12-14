import {  IsNotEmpty,IsEmail,IsBoolean, IsNumber} from 'class-validator';

export class CreateTenantDto {
    @IsNotEmpty()
    fullname: string;
    
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;

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