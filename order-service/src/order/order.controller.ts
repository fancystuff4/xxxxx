import { Controller, Post, Body, Res, HttpStatus, Get, Req, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
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
        @Res() res: any
    ) : Promise<OrderResponseDto> {
        try {
            const newOrder: OrderDetailsFunctionResponseDto = await this.orderService.createOrder(customerId, createOrderDetails);
            if (newOrder.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    order: newOrder.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Create Order',
                    error: 'Bad Request'
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
        @Res() res: any
    ) : Promise<OrderResponseDto> {
        try {
            const order : OrderDetailsFunctionResponseDto = await this.orderService.getOrderByOrderId(id);
            if (order.ok) {
                    return res.status(HttpStatus.OK).json({
                        ok: true,
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
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrderByCustomerId(customerId);
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
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
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrdersByOrderStatus(status);
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
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
    async getAllOrders(
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getAllOrders();
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
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

    @Put(':id')
    async updateOrderByOrderId(
        @Body() body: any, 
        @Param('id') id: string,
        @Res() res: any
    ) : Promise<OrderResponseDto> {
        try {
            const order : OrderDetailsFunctionResponseDto = await this.orderService.getOrderByOrderId(id);
            if(order.ok && Object.keys(order.data).length !== 0)
            {
                const updatedOrder: OrderDetailsFunctionResponseDto = await this.orderService.updateOrder(body, id);
                if (updatedOrder.ok) {
                    return res.status(HttpStatus.ACCEPTED).json({
                        ok: true,
                        order: updatedOrder.data,
                    });
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
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
        @Res() res: any
    ) : Promise<OrderResponseDto> {
        try {
            const result: OrderDetailsFunctionResponseDto = await this.orderService.deleteOrderById(id);
            if (result.ok) {
                if(!result.data) {
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
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Delete Order',
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
}