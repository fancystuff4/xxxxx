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
      3000,
    );
    return result;
  }

  async updateVariantStatus(data, subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/active`,
      'put',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async getVariants(subCategoryId, productId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants`,
      'get',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async getVariant(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}`,
      'get',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async deleteVariant(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}`,
      'delete',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async getVariantOptions(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/options`,
      'get',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async addVariantImage(data, subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/options`,
      'post',
      data,
      undefined,
      3000,
    );
    return result;
  }

  async getVariantImages(subCategoryId, productId, variantId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/images`,
      'get',
      undefined,
      undefined,
      3000,
    );
    return result;
  }

  async deleteVariantImages(subCategoryId, productId, variantId, imageId) {
    const result: any = await InvokeAPI(
      `/subCategories/${subCategoryId}/products/${productId}/variants/${variantId}/images/${imageId}`,
      'delete',
      undefined,
      undefined,
      3000,
    );
    return result;
  }
}
