import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable()
export class ValidCategoryGuard implements CanActivate {
  constructor(private readonly categoryService: CategoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id: categoryId } = request.params;
    if (!categoryId) return false;

    const {
      isValid,
      categories: [correspondingCategory],
    } = await this.categoryService.validateCategoriesAndReturn({
      id: categoryId,
    });

    if (!isValid) throw new BadRequestException(['Invalid category id']);

    request.category = correspondingCategory;
    return true;
  }
}
