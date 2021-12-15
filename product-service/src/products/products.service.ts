import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductRepository } from './product.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(newProduct: CreateProductDto) {
    return this.productRepository.createProduct(newProduct);
  }

  getProductById(id: string) {
    return this.productRepository.getProductById(id);
  }

  getProducts(paginationObj: { Limit?: number; startKey?: string }) {
    return this.productRepository.getProducts(paginationObj);
  }

  deleteProductById(id: string) {
    return this.productRepository.deleteProductById(id);
  }

  updateProduct(id: string, attributeObjToUpdate: object) {
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    let UpdateExpression = 'SET ';

    const fieldAttributes = Object.keys(attributeObjToUpdate).map((attr) => ({
      keyAlias: `#${uuid().substr(0, 5)}`,
      valueAlias: `:${uuid().substr(0, 5)}`,
      key: attr,
      value: attributeObjToUpdate[attr],
    }));

    fieldAttributes.forEach((input) => {
      ExpressionAttributeValues[input.valueAlias] = input.value;
      ExpressionAttributeNames[input.keyAlias] = input.key;
      UpdateExpression += `${input.keyAlias}= ${input.valueAlias},`;
    });

    UpdateExpression = UpdateExpression.substring(
      0,
      UpdateExpression.length - 1,
    );

    ExpressionAttributeValues[':id'] = id;
    const ConditionExpression = 'id = :id';

    return this.productRepository.updateProduct(id, {
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ConditionExpression,
    });
  }
}
