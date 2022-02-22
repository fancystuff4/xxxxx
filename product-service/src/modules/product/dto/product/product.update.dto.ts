import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './index';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
