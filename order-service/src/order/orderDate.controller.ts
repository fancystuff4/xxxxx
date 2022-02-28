import { Controller, Res, HttpStatus, Get, Param } from '@nestjs/common';
import * as moment from 'moment';
import { OrderDetailsArrayFunctionResponseDto } from './dto/orderDetailsArrayFunctionResponse.dto';
import { OrderDetailsResponseDto } from './dto/orderDetailsResponse.dto';
import { OrderService } from './order.service';

@Controller('orders/date')
export class OrderDateController {
    constructor(private orderService: OrderService) {}

    @Get('from/:from/to/:to')
    async getOrderByDateRange(
        @Param('from') from: string,
        @Param('to') to: string,
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        const startingDate : string = moment(from).startOf('day').format('x');
        const endingDate : string = moment(to).endOf('day').format('x');
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrderByDateRange(parseInt(startingDate), parseInt(endingDate));
            if (order.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    order: order.data,
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

    @Get('from/:from/to/:to/customer/:customerId')
    async getOrdersByDateRangeAndCustomerId(
        @Param('from') from: string,
        @Param('to') to: string,
        @Param('customerId') customerId: string,
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        const startingDate : string = moment(from).startOf('day').format('x');
        const endingDate : string = moment(to).endOf('day').format('x');
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrdersByDateRangeAndCustomerId(parseInt(startingDate), parseInt(endingDate),customerId);
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
    
    @Get(':date')
    async getOrdersByDate(
        @Param('date') date: string,
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        const startingDate : string = moment(date).startOf('day').format('x');
        const endingDate : string = moment(date).endOf('day').format('x');
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrderByDateRange(parseInt(startingDate), parseInt(endingDate));
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

    @Get(':date/customer/:customerId')
    async getOrdersByDateAndCustomerId(
        @Param('date') date: string,
        @Param('customerId') customerId: string,
        @Res() res: any
    ) : Promise<OrderDetailsResponseDto> {
        const startingDate : string = moment(date).startOf('day').format('x');
        const endingDate : string = moment(date).endOf('day').format('x');
        try {
            const order: OrderDetailsArrayFunctionResponseDto = await this.orderService.getOrdersByDateRangeAndCustomerId(parseInt(startingDate), parseInt(endingDate),customerId);
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

}