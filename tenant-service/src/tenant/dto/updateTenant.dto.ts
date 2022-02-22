import { IsOptional } from 'class-validator';

export class UpdateTenantDto {

    @IsOptional()
    address: string;

    @IsOptional()
    fullname: string;

    @IsOptional()
    username: string;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    country: string;

    @IsOptional()
    pin: string;

    @IsOptional()
    status: boolean;
}
