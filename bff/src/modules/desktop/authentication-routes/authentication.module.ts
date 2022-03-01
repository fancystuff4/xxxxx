import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import AuthenticationController from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [HttpModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService]
})

export class AuthenticationModule{};