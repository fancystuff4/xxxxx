import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { ROLES } from '../helpers/user.types';
export class SignUpInputDto {

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;

  @ValidateIf((attrs) => attrs.role === ROLES.USER.TYPE)
  @IsNotEmpty()
  tenantId: string;

}
