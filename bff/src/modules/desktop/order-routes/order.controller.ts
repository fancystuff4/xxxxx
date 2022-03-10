import { Body, Controller, Get, Post, Response, Request,Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpService } from '@nestjs/axios';
import { CreateOrderDto } from './dto/order.dto';
// import { LogoutDto, LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenDto, GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { ErrorDto, ErrorResponseDto } from './dto/error.dto';
// import { SigninDto, SigninResponseDto } from './dto/signin.dto';
// import { SignupDto, SignupResponseDto } from './dto/signup.dto';
// import { RequestedHeaderDto } from './dto/requestedHeader.dto';
// import { SigninInputDto, SignupInputDto } from './dto/userDetailsInput.dto';

@Controller('desktop')
class OrderController {
    constructor(private orderService: OrderService, private httpService: HttpService) {}

    @Post('customers/:customerId/orders')
    async CreateOrderAPI(
        @Body() body: CreateOrderDto,
        @Param('customerId') customerId: string,
        @Response() res: any
    ) : Promise<void> {
        const result : any = await this.orderService.createOrder(customerId,body);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('orders/:id')
    async GetOrderByIdApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderById(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('customers/:customerId/orders')
    async GetOrderByCustomerIdApi(
        @Param('customerId') customerId: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderByCustomerId(customerId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('orderStatus/:status/orders')
    async GetOrderByOrderStatusApi(
        @Param('status') status: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderByOrderStatus(status);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('orders')
    async GetAllOrdersApi(
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getAllOrders();
        return res.status(result.statusCode).json(result.data);
    }

    @Get('from/:from/to/:to/orders')
    async GetOrdersBetweenDatesApi(
        @Response() res: any, 
        @Param('from') from: string,
        @Param('to') to: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersBetweenDates(from,to);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('from/:from/to/:to/customers/:customerId/orders')
    async GetOrdersByDateRangeAndCustomerIdApi(
        @Response() res: any, 
        @Param('from') from: string,
        @Param('customerId') customerId: string,
        @Param('to') to: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersByDateRangeAndCustomerId(from,to,customerId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('date/:date/orders')
    async GetOrdersByDateApi(
        @Response() res: any, 
        @Param('date') date: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersByDate(date);
        return res.status(result.statusCode).json(result.data);
    }

    @Get('date/:date/customer/:customerId/orders')
    async GetOrdersByDateAndCustomerIdApi(
        @Response() res: any, 
        @Param('date') date: string,
        @Param('customerId') customerId: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersByDateAndCustomerId(date,customerId);
        return res.status(result.statusCode).json(result.data);
    }
}
export default OrderController;