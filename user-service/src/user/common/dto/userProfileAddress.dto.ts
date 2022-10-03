import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
export class UserProfileAddressDto {
  addressId: string;

  @IsNotEmpty()
  placeName: string;

  @IsNotEmpty()
  landmark: string;

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
  @IsNumber()
  phoneNumber: string;

  @IsBoolean()
  default: boolean;
}
