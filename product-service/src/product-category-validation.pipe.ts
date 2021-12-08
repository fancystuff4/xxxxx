import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ProductCatetory } from './products/Product.enum';

@Injectable()
export class ProductCategoryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value',value);
    if(!(value.category in ProductCatetory)){
      throw new BadRequestException(`${value.category} is not a valid category`);
    }
    return value;
  }
}
