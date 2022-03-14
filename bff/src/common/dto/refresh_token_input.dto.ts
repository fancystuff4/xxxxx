import { IsNotEmpty, IsEmail, ValidateIf } from "class-validator";
import { ROLES } from "../helpers/user.types";

export class RefreshToken {

    @IsNotEmpty()
    @IsEmail()
    user: string;
  
    @IsNotEmpty()
    role: string;
  
    @ValidateIf((attrs) => attrs.role === ROLES.USER.TYPE)
    @IsNotEmpty()
    tenantId: string;

}