import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../../common/methods/invokeAPI';
@Injectable()
export class SubCategoryService {
  async createSubCategory(data, categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories`,
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneSubCategory(categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getSubCategories(categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteSubCategory(categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateSubCategory(data, categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateSubCategoryStatus(data, categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/active/${subCategoryId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addSubCategoryOption(data, categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options`,
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getSubCategoryOption(categoryId, subCategoryId, optionId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options/${optionId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getSubCategoryOptions(categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateSubCategoryOption(data, categoryId, subCategoryId, optionId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options/${optionId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateSubCategoryOptionStatus(
    data,
    categoryId,
    subCategoryId,
    optionId,
  ) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options/${optionId}/active`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteSubCategoryOption(categoryId, subCategoryId, optionId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/options/${optionId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addSubCategoryImage(data, categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/images`,
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getSubCategoryImage(categoryId, subCategoryId, imageId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/images/${imageId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getSubCategoryImages(categoryId, subCategoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/images`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteSubCategoryImage(categoryId, subCategoryId, imageId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/sub-categories/${subCategoryId}/images/${imageId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }
}
