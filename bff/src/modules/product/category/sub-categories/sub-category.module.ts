import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import SubCategoryController from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
    imports: [HttpModule],
    controllers: [SubCategoryController],
    providers: [SubCategoryService]
})

export class SubCategoryModule{};