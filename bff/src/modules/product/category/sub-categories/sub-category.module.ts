import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import SubCategoryController from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
    controllers: [SubCategoryController],
    providers: [SubCategoryService, AuthenticationService]
})

export class SubCategoryModule{};