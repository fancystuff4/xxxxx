import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Dynamo } from './db/dynamo';
import { UserRepository } from './user.repository';

@Global()
@Module({
  providers: [UserService, Dynamo, UserRepository],
  exports: [UserService],
})
export class UserModule {}
