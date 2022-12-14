import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../../common/methods/invokeAPI';
@Injectable()
export class VariantService {
  async updateVariant(data, subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateVariantStatus(data, subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/active`,
      'put',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getVariants(subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getVariant(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );

    return result;
  }

  async deleteVariant(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getVariantOptions(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/options`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addVariantImage(body, subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/images`,
      'post',
      body,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getVariantImages(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/images`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteVariantImages(subCategoryId, productId, variantId, imageId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/images/${imageId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }
}
