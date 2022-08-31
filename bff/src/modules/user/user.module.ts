import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import UserController from './user.controller';
import { UserService } from './user.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, AuthenticationService],
})
export class UserModule {}
