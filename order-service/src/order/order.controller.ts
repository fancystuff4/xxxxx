import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderDetailsFunctionResponseDto } from './dto/orderDetailsFunctionResponse.dto';
import { OrderResponseDto } from './dto/orderResponse.dto';
import { OrderDetailsResponseDto } from './dto/orderDetailsResponse.dto';
import { OrderDetailsArrayFunctionResponseDto } from './dto/orderDetailsArrayFunctionResponse.dto';

@Controller('/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('customer/:customerId')
  async createOrder(
    @Body() createOrderDetails: CreateOrderDto,
    @Param('customerId') customerId: string,
    @Res() res: any,
  ): Promise<OrderResponseDto> {
    try {
      const newOrder: OrderDetailsFunctionResponseDto =
        await this.orderService.createOrder(customerId, createOrderDetails);
      if (newOrder.ok) {
        return res.status(HttpStatus.CREATED).json({
          ok: true,
          statusCode: 200,
          order: newOrder.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Create Order',
          error: 'Bad Request',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get(':id')
  async getOrderByOrderId(
    @Param('id') id: string,
    @Res() res: any,
  ): Promise<OrderResponseDto> {
    try {
      const order: OrderDetailsFunctionResponseDto =
        await this.orderService.getOrderByOrderId(id);
      if (order.ok) {
        return res.json({
          ok: true,
          statusCode: 200,
          message: 'Order List with Id',
          order: order.data,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get('customer/:customerId')
  async getOrdersByCustomerId(
    @Param('customerId') customerId: string,
    @Res() res: any,
  ): Promise<OrderDetailsResponseDto> {
    try {
      const order: OrderDetailsArrayFunctionResponseDto =
        await this.orderService.getOrderByCustomerId(customerId);
      if (order.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 200,
          message: 'Order List with CustomerId',
          order: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Get Orders',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get('orderStatus/:status')
  async getOrdersByOrderStatus(
    @Param('status') status: string,
    @Res() res: any,
  ): Promise<OrderDetailsResponseDto> {
    try {
      const order: OrderDetailsArrayFunctionResponseDto =
        await this.orderService.getOrdersByOrderStatus(status);
      if (order.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 200,
          message: 'Order List By Order Status',
          order: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Get Orders',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get()
  async getAllOrders(@Res() res: any): Promise<OrderDetailsResponseDto> {
    try {
      const order: OrderDetailsArrayFunctionResponseDto =
        await this.orderService.getAllOrders();
      if (order.ok) {
        return res.status(HttpStatus.OK).json({
          ok: true,
          statusCode: 200,
          message: 'Order All',
          orders: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Get Order',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get('from/:from/to/:to/orders')
  async getOrderBetweenDates(
    @Res() res: any,

    @Param('from') from: number,

    @Param('to') to: number,
  ): Promise<void> {
    try {
      const order: any = await this.orderService.getOrderByDateRange(from, to);

      if (order.ok) {
        return res.json({
          ok: true,

          statusCode: 200,

          orders: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,

          message: 'Error Trying to Get Order',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,

        message: 'Error Trying to reach DB',

        errors: error,
      });
    }
  }

  @Get('from/:from/to/:to/customer/:customerId/orders')
  async getOrdersByDateRangeAndCustomerId(
    @Res() res: any,
    @Param('from') from: number,
    @Param('customerId') customerId: string,
    @Param('to') to: number,
  ): Promise<void> {
    try {
      const order: any =
        await this.orderService.getOrdersByDateRangeAndCustomerId(
          from,
          to,
          customerId,
        );
      if (order.ok) {
        return res.json({
          ok: true,
          statusCode: 200,
          message: 'Order List with Date and customerId',
          order: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          statusCode: 400,
          message: 'Error Trying to Get Orders',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        statusCode: 500,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }
  @Get('date/:date/customer/:customerId/orders')
  async getOrdersByDateAndCustomerId(
    @Res() res: any,
    @Param('date') date: number,
    @Param('customerId') customerId: string,
  ): Promise<void> {
    try {
      const order: any = await this.orderService.getOrdersByDateAndCustomerId(
        date,
        customerId,
      );
      if (order.ok) {
        return res.json({
          ok: true,
          statusCode: 200,
          message: 'Order List with Date and customerId',
          order: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          statusCode: 400,
          message: 'Error Trying to Get Orders',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        statusCode: 500,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Get('date/:date/orders')
  async getOrdersByDate(
    @Res() res: any,
    @Param('date') date: string,
  ): Promise<void> {
    try {
      const order: any = await this.orderService.getOrderByDate(date);
      if (order.ok) {
        return res.json({
          ok: true,
          statusCode: 200,
          message: 'Order List by ordered Date ',
          order: order.data,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          statusCode: 400,
          message: 'Error Trying to Get Orders',
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        statusCode: 500,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Put(':id')
  async updateOrderByOrderId(
    @Body() body: UpdateOrderDto,
    @Param('id') id: string,
    @Res() res: any,
  ): Promise<OrderResponseDto> {
    try {
      const order: OrderDetailsFunctionResponseDto =
        await this.orderService.getOrderByOrderId(id);
      if (order.ok && Object.keys(order.data).length !== 0) {
        const updatedOrder: OrderDetailsFunctionResponseDto =
          await this.orderService.updateOrder(body, id);
        if (updatedOrder.ok) {
          return res.status(HttpStatus.ACCEPTED).json({
            ok: true,
            statusCode: 200,
            message: 'Order updated',
            order: updatedOrder.data,
          });
        } else {
          return res.json({
            ok: false,
            message: 'Error Trying to Create Order',
          });
        }
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          ok: false,
          message: `Order with order Id ${id} not found`,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }

  @Delete(':id')
  async deleteOrderById(
    @Param('id') id: string,
    @Res() res: any,
  ): Promise<OrderResponseDto> {
    try {
      const result: OrderDetailsFunctionResponseDto =
        await this.orderService.deleteOrderById(id);
      if (result.ok) {
        if (!result.data) {
          return res.status(HttpStatus.OK).json({
            ok: true,
            message: `Order with Order Id ${id} not found`,
          });
        }
        return res.status(HttpStatus.OK).json({
          ok: true,
          data: result.data,
        });
      } else {
        return res.json({
          ok: false,
          message: 'Error Trying to Delete Order',
        });
      }
    } catch (error) {
      return res.json({
        ok: false,
        message: 'Error Trying to reach DB',
        errors: error,
      });
    }
  }
}
