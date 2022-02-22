import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class ValidateProductGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { subCategoryId, productId } = request.params;

    if (!subCategoryId || !productId) return false;

    const {
      isValid,
      products: [correspondingProduct],
    } = await this.productService.validateProductsAndReturn(
      {
        id: productId,
        subCategoryId,
      },
      {
        relations: ['subCategory'],
      },
    );

    if (!isValid)
      throw new BadRequestException([
        'Invalid product. Check the sub-category and product id',
      ]);

    request.product = correspondingProduct;
    request.subCategory = correspondingProduct.subCategory;

    return true;
  }
}
