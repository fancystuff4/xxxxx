import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from 'src/common/methods/invokeAPI';

@Injectable()
export class AuthenticationService {
  async signup(data): Promise<any> {
    return await InvokeAPI('/auth/local/signup', 'post', data, undefined, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }

  async signin(data): Promise<any> {
    return await InvokeAPI('/auth/local/signin', 'post', data, undefined, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }

  async refresh(data): Promise<any> {
    return await InvokeAPI('/auth/refresh', 'post', undefined, data, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }

  async logout(data) {
    return await InvokeAPI('/auth/logout', 'post', undefined, data, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }

  async getProfile(data): Promise<any> {
    return await InvokeAPI('/auth/profile', 'get', undefined, data, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }

  async verifyToken(data): Promise<any> {
    return await InvokeAPI('/auth/verify', 'get', undefined, data, Number(process.env.AUTHENTICATION_SERVICE_PORT));
  }
}
