import { Body, Controller, Get, Post, Response, Request,Param,HttpStatus,
    HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpService } from '@nestjs/axios';
import { CreateOrderDto } from './helper/dto/order.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from './helper/routes';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthenticationService } from '../authentication/authentication.service';
// import { LogoutDto, LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenDto, GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { ErrorDto, ErrorResponseDto } from './dto/error.dto';
// import { SigninDto, SigninResponseDto } from './dto/signin.dto';
// import { SignupDto, SignupResponseDto } from './dto/signup.dto';
// import { RequestedHeaderDto } from './dto/requestedHeader.dto';
// import { SigninInputDto, SignupInputDto } from './dto/userDetailsInput.dto';


@Controller('desktop')
class OrderController {
    constructor(private orderService: OrderService,
         private httpService: HttpService,
         private authService: AuthenticationService) {}

    @Post([DESKTOP_ROUTES.CREATE_ORDER, MOBILE_ROUTES.CREATE_ORDER])
    @Roles(Role.User)
    async CreateOrderAPI(
        @Body() body: CreateOrderDto,
        @Request() req: any,
        @Response() res: any
    ) : Promise<void> {
        let customerId = ""
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            customerId = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const result : any = await this.orderService.createOrder(customerId,body);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BY_ID,MOBILE_ROUTES.GET_ORDER_BY_ID])
    @Roles(Role.Tenant)
    async GetOrderByIdApi(
        @Param('id') id: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderById(id);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BY_CUSOTOMER_ID,MOBILE_ROUTES.GET_ORDER_BY_CUSOTOMER_ID])
    @Roles(Role.Tenant)
    async GetOrderByCustomerIdApi(
        @Param('customerId') customerId: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderByCustomerId(customerId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([[DESKTOP_ROUTES.GET_ORDER_BY_ORDER_STATUS,MOBILE_ROUTES.GET_ORDER_BY_ORDER_STATUS])
    @Roles(Role.Tenant)
    async GetOrderByOrderStatusApi(
        @Param('status') status: string,
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrderByOrderStatus(status);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ALL_ORDERS,MOBILE_ROUTES.GET_ALL_ORDERS])
    @Roles(Role.Tenant)
    async GetAllOrdersApi(
        @Response() res: any
    ) : Promise<void> {
        const result :  any= await this.orderService.getAllOrders();
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BETWEEN_DATES,MOBILE_ROUTES.GET_ORDER_BETWEEN_DATES])
    @Roles(Role.Tenant)
    async GetOrdersBetweenDatesApi(
        @Response() res: any, 
        @Param('from') from: string,
        @Param('to') to: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersBetweenDates(from,to);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID,MOBILE_ROUTES.GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID])
    @Roles(Role.Tenant)
    async GetOrdersByDateRangeAndCustomerIdApi(
        @Response() res: any, 
        @Param('from') from: string,
        @Param('customerId') customerId: string,
        @Param('to') to: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersByDateRangeAndCustomerId(from,to,customerId);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BY_DATE,MOBILE_ROUTES.GET_ORDER_BY_DATE])
    @Roles(Role.Tenant)
    async GetOrdersByDateApi(
        @Response() res: any, 
        @Param('date') date: string,
    ) : Promise<void> {
        const result :  any= await this.orderService.getOrdersByDate(date);
        return res.status(result.statusCode).json(result.data);
    }

    @Get([DESKTOP_ROUTES.GET_ORDER_BY_DATE_AND_CUSTOMER_ID,MOBILE_ROUTES.GET_ORDER_BY_DATE_AND_CUSTOMER_ID])
    @Roles(Role.Tenant)
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