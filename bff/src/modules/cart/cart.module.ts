import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import CartController from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [HttpModule],
    controllers: [CartController],
    providers: [
        CartService,AuthenticationService
    ],
    exports: [CartService]
})

export class CartModule{};