import { HttpService } from '@nestjs/axios';
import { InvokeAPI } from '../../../common/methods/invokeAPI';

export class ProductService {
  async createProduct(body, subCategoryId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products`,
      'post',
      body,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneProduct(subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getProductsByIds(subCategoryId, limit, offset, ids) {
    var url = `/subCategories/${subCategoryId}/products?`;
    if (limit) {
      url += `limit=${limit}&`;
    }
    if (offset) {
      url += `offset=${offset}&`;
    }
    if (ids) {
      url += `ids=${ids}`;
    }
    const result: any = await InvokeAPI(url, 'get', undefined, undefined, Number(process.env.PRODUCT_SERVICE_PORT));
    return result;
  }

  async getProducts(subCategoryId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteProduct(subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateProductStatus(body, subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/active`,
      'put',
      body,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addProductImages(body, subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/images`,
      'post',
      body,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneProductImage(subCategoryId, productId, imageId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/images/${imageId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getProductImages(subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/images`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteProductImage(subCategoryId, productId, imageId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/images/${imageId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }
}
