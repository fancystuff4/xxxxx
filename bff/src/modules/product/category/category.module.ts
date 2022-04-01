import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import CategoryController from './category.controller';
import { CategoryService } from './category.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, AuthenticationService]
})

export class CategoryModule{};