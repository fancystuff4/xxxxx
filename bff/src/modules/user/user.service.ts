import { Injectable } from '@nestjs/common';
import { InvokeAPI } from 'src/common/methods/invokeAPI';

@Injectable()
export class UserService {
  async addProfile(userId: any, tenantId: any, data: any): Promise<any> {
    return await InvokeAPI(
      `/user/profile/users/${userId}/tenants/${tenantId}`,
      'post',
      data,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }

  async getProfile(userId: any, tenantId: any): Promise<any> {
    return await InvokeAPI(
      `/user/profile/users/${userId}/tenants/${tenantId}`,
      'get',
      undefined,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }

  async updateProfile(userId: any, tenantId: any, body: any): Promise<any> {
    return await InvokeAPI(
      `/user/profile/users/${userId}/tenants/${tenantId}`,
      'patch',
      body,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }

  async updateProfileAddress(
    userId: any,
    tenantId: any,
    body: any,
  ): Promise<any> {
    return await InvokeAPI(
      `/user/profile/address/users/${userId}/tenants/${tenantId}`,
      'patch',
      body,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }

  async daleteProfileAddressById(
    userId: any,
    tenantId: any,
    addressId: any,
  ): Promise<any> {
    return await InvokeAPI(
      `/user/profile/address/users/${userId}/tenants/${tenantId}/address/${addressId}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }

  async updateDefaultProfileAddressById(
    userId: any,
    tenantId: any,
    addressId: any,
  ): Promise<any> {
    return await InvokeAPI(
      `/user/profile/address/default/users/${userId}/tenants/${tenantId}/address/${addressId}`,
      'patch',
      undefined,
      undefined,
      Number(process.env.USER_SERVICE_PORT),
    );
  }
}
