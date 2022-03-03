import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication-routes/authentication.module';

@Module({
    imports: [AuthenticationModule]
})

export class DesktopModule{};