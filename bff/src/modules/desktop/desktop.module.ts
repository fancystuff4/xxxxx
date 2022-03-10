import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication-routes/authentication.module';
import { OrderModule } from './order-routes/order.module';

@Module({
    imports: [AuthenticationModule,OrderModule]
})

export class DesktopModule{};