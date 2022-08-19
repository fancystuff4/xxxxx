import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderDetailsArrayFunctionResponseDto } from './dto/orderDetailsArrayFunctionResponse.dto';
import { OrderDetailsFunctionResponseDto } from './dto/orderDetailsFunctionResponse.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(
    customerId: string,
    createOrderDetails: CreateOrderDto,
  ): Promise<OrderDetailsFunctionResponseDto> {
    const createdOrder: OrderDetailsFunctionResponseDto =
      await this.orderRepository.createOrder(customerId, createOrderDetails);
    return createdOrder;
  }

  async getOrderByOrderId(
    id: string,
  ): Promise<OrderDetailsFunctionResponseDto> {
    const Order: OrderDetailsFunctionResponseDto =
      await this.orderRepository.getOrderByOrderId(id);
    return Order;
  }

  async getOrderByCustomerId(
    customerId: string,
  ): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Order: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrderByCustomerId(customerId);
    return Order;
  }

  async getOrdersByDateRangeAndCustomerId(
    startDate: number,
    endDate: number,
    customerId: string,
  ): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Order: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrdersByDateRangeAndCustomerId(
        startDate,
        endDate,
        customerId,
      );
    return Order;
  }

  async getOrdersByDateAndCustomerId(
    Date: number,
    customerId: string,
  ): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Order: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrdersByDateAndCustomerId(Date, customerId);
    return Order;
  }
  async getOrderByDateRange(
    startDate: number,
    endDate: number,
  ): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Order: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrderByDateRange(startDate, endDate);
    return Order;
  }

  async getOrdersByOrderStatus(
    orderStatus: string,
  ): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Order: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrdersByOrderStatus(orderStatus);
    return Order;
  }

  async getAllOrders(): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Orders: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getAllOrders();
    return Orders;
  }

  async getOrderByDate(date): Promise<OrderDetailsArrayFunctionResponseDto> {
    const Orders: OrderDetailsArrayFunctionResponseDto =
      await this.orderRepository.getOrderByDate(date);
    return Orders;
  }

  async updateOrder(
    body: any,
    id: string,
  ): Promise<OrderDetailsFunctionResponseDto> {
    const updatedOrder: OrderDetailsFunctionResponseDto =
      await this.orderRepository.updatedOrder(body, id);
    return updatedOrder;
  }

  async deleteOrderById(id: string): Promise<OrderDetailsFunctionResponseDto> {
    return this.orderRepository.deleteOrderById(id);
  }
}
