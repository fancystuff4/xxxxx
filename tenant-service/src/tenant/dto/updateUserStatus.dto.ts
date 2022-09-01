import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateUserStatus {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
