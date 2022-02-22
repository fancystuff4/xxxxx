import {  IsNotEmpty,IsEmail } from 'class-validator';

export class CreateTenantDto {
    @IsNotEmpty()
    fullname: string;
    
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    pin: string;

    @IsNotEmpty()
    status: boolean;
}