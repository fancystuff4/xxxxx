import { Module } from '@nestjs/common';
import { Dynamo } from './db/dynamo';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, Dynamo, UserRepository],
})
export class UserModule {}
