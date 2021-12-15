import { CreateProductDto } from './dto/createProduct.dto';
import client from '../db/client';

type getProductParams = {
  TableName: string;
  Select: string;
  Limit?: number;
  ExclusiveStartKey?: object;
};

export class ProductRepository {
  createProduct(newProduct: CreateProductDto) {
    return client
      .put({
        TableName: 'ProductsTable-dev',
        Item: newProduct,
      })
      .promise();
  }

  getProductById(id: string) {
    return client
      .get({
        TableName: 'ProductsTable-dev',
        Key: { id },
      })
      .promise();
  }

  getProducts(paginationObj: { Limit?: number; startKey?: string }) {
    const params: getProductParams = {
      TableName: 'ProductsTable-dev',
      Select: 'ALL_ATTRIBUTES',
    };

    if (paginationObj?.Limit) params.Limit = paginationObj.Limit;
    if (paginationObj?.startKey)
      params.ExclusiveStartKey = { id: paginationObj.startKey };

    return client.scan(params).promise();
  }

  deleteProductById(id: string) {
    return client
      .delete({
        TableName: 'ProductsTable-dev',
        Key: { id },
        ReturnValues: 'ALL_OLD',
      })
      .promise();
  }

  updateProduct(id: string, updateOptions: any) {
    return client
      .update({
        TableName: 'ProductsTable-dev',
        Key: { id },
        ReturnValues: 'ALL_NEW',
        ...updateOptions,
      })
      .promise();
  }
}
