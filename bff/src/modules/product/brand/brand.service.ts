import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../common/methods/invokeAPI';
@Injectable()
export class BrandService {
  async createBrand(data) {
    const result: any = await InvokeAPI(
      '/brands',
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getOneBrand(data) {
    const result: any = await InvokeAPI(
      `/brands/${data}`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getBrands() {
    const result: any = await InvokeAPI(
      `/brands`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteBrand(brandId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateBrand(data, brandId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateBrandStatus(data, brandId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}/active`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async addBrandLogo(data, brandId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}/logos`,
      'post',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async getBrandLogos(brandId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}/logos`,
      'get',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async updateBrandLogo(data, brandId, logoId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}/logos/${logoId}`,
      'put',
      data,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }

  async deleteBrandLogo(brandId, logoId) {
    const result: any = await InvokeAPI(
      `/brands/${brandId}/logos/${logoId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.PRODUCT_SERVICE_PORT),
    );
    return result;
  }
}
