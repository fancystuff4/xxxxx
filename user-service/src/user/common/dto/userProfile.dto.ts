import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { genderType } from '../constants/';

export class UserProfileDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  phoneNumber: number;

  @IsDateString()
  birthDate: Date;

  address: any[];

  @IsEnum(genderType)
  gender: string;
}

export class UserParamsDto {
  tenantId: string;

  userId: string;
}
