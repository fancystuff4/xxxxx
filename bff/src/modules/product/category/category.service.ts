import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../common/methods/invokeAPI';
@Injectable()
export class CategoryService {
  async createCategory(data) {
    const result: any = await InvokeAPI(
      '/categories',
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneCategory(data) {
    const result: any = await InvokeAPI(
      `/categories/${data}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getCategories() {
    const result: any = await InvokeAPI(
      `/categories`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteCategory(categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateCategory(data, categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateCategoryStatus(data, categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/status`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addCategoryImage(data, categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/images`,
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneCategoryImage(categoryId, imageId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/images/${imageId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getCategoryImages(categoryId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/images`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteCategoryImage(categoryId, imageId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/images/${imageId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateCategoryImage(data, categoryId, imageId) {
    const result: any = await InvokeAPI(
      `/categories/${categoryId}/images/${imageId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }
}
