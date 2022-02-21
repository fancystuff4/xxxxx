import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { SubCategoryService } from 'src/modules/category/sub-category/sub-category.service';

@Injectable()
export class ValidateSubCategoryGuard implements CanActivate {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { subCategoryId } = request.params;

    if (!subCategoryId) return false;

    const {
      isValid,
      subCategories: [correspondingSubCategory],
    } = await this.subCategoryService.validateSubCategoriesAndReturn({
      id: subCategoryId,
    });

    if (!isValid) throw new BadRequestException(['Invalid sub-category id']);

    request.subCategory = correspondingSubCategory;

    return true;
  }
}
