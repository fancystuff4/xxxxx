import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../common/methods/invokeAPI';
// import { ErrorResponseDto } from './dto/error.dto';
// import { GetUserProfileResponseDto } from './dto/getUserProfile.dto';
// import { LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { SigninResponseDto } from './dto/signin.dto';
// import { SignupResponseDto } from './dto/signup.dto';
@Injectable()
export class OrderService {
  constructor(private httpService: HttpService) {}

  async createOrder(customerId, data) {
    const result: any = await InvokeAPI(
      `/dev/orders/customer/${customerId}`,
      'post',
      data,
      undefined,
      5000,
    );
    return result;
  }

  async getOrderById(orderId) {
    const result: any = await InvokeAPI(
      `/dev/orders/${orderId}`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrderByCustomerId(customerId) {
    const result: any = await InvokeAPI(
      `/dev/orders/customer/${customerId}`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrderByOrderStatus(orderStatus) {
    const result: any = await InvokeAPI(
      `/dev/orders/orderStatus/${orderStatus}`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getAllOrders() {
    const result: any = await InvokeAPI(
      '/dev/orders',
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrdersBetweenDates(dateFrom, dateTo) {
    const result: any = await InvokeAPI(
      `/dev/orders/from/${dateFrom}/to/${dateTo}/orders`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrdersByDateRangeAndCustomerId(dateFrom, dateTo, customerId) {
    const result: any = await InvokeAPI(
      `/dev/orders/from/${dateFrom}/to/${dateTo}/customer/${customerId}/orders`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrdersByDate(date) {
    const result: any = await InvokeAPI(
      `/dev/orders/date/${date}/orders`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async getOrdersByDateAndCustomerId(date, customerId) {
    const result: any = await InvokeAPI(
      `/dev/orders/date/${date}/customer/${customerId}/orders`,
      'get',
      undefined,
      undefined,
      5000,
    );
    return result;
  }

  async updateOrder(data, id) {
    const result: any = await InvokeAPI(
      `/dev/orders/${id}`,
      'put',
      data,
      undefined,
      5000,
    );
    return result;
  }
}
