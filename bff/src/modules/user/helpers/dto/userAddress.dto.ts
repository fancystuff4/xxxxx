import { IsNotEmpty, IsNumber } from 'class-validator';
export class UserProfileAddressDto {
  addressId: string;

  @IsNotEmpty()
  placeName: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  pin: string;
}
