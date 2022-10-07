import { IsBoolean, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class AddTenantDto {
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
