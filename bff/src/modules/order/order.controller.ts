import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  Request,
  Param,
  HttpStatus,
  HttpException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpService } from '@nestjs/axios';
import { CreateOrderDto } from './helper/dto/order.dto';
import { DESKTOP_ROUTES, MOBILE_ROUTES } from './helper/routes';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthenticationService } from '../authentication/authentication.service';
import { ProductService } from '../product/product/product.service';
import { VariantService } from '../product/product/variant/variant.service';
import { CartService } from '../cart/cart.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserService } from '../user/user.service';
// import { LogoutDto, LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenDto, GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { ErrorDto, ErrorResponseDto } from './dto/error.dto';
// import { SigninDto, SigninResponseDto } from './dto/signin.dto';
// import { SignupDto, SignupResponseDto } from './dto/signup.dto';
// import { RequestedHeaderDto } from './dto/requestedHeader.dto';
// import { SigninInputDto, SignupInputDto } from './dto/userDetailsInput.dto';

@Controller('desktop')
@UseGuards(AuthGuard)
class OrderController {
  constructor(
    private orderService: OrderService,
    private httpService: HttpService,
    private authService: AuthenticationService,
    private variantService: VariantService,
    private cartService: CartService,
    private userService: UserService,
  ) {}

  @Post([DESKTOP_ROUTES.CREATE_ORDER, MOBILE_ROUTES.CREATE_ORDER])
  @Roles(Role.User)
  async CreateOrderAPI(
    @Request() req: any,
    @Response() res: any,
  ): Promise<void> {
    let customerId = '';
    let tenantId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);

      tenantId = response.data.tenantId;
      customerId = response.data.username;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const userCart = await this.cartService.getUserCart(customerId);

    const userAddress = await this.userService.getProfile(customerId, tenantId);

    const address = [];

    let data = null;
    const items = [];

    try {
      if (userAddress?.data[0]?.address) {
        for (let value of userAddress?.data[0]?.address) {
          if (value.default === true) {
            address.push({
              placeName: value.placeName,
              landmark: value.landmark,
              city: value.city,
              pin: value.pin,
              state: value.state,
              phone: value.phoneNumber,
              country: value.country,
            });
          }
        }
      } else {
        return res
          .status(404)
          .json({ msg: 'Address not found! Please enter your address!' });
      }
      if (userCart.data) {
        for (let item of userCart?.data?.items) {
          const variant = item.itemDetails.variant;

          const variantDetails = await this.variantService.getVariant(
            variant.subcategoryId,
            variant.itemID,
            variant.variantID,
          );

          items.push({
            variant: variantDetails.data,
            lineItemID: item.lineItemID,
            quantity: item.itemDetails.quantity,
          });
        }
      }
      data = {
        items,
        address,
      };
      const result: any = await this.orderService.createOrder(customerId, data);
      const emptyCart: any = await this.cartService.deleteCart(
        customerId,
        userCart.data.id,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Get([DESKTOP_ROUTES.GET_ORDER_BY_ID, MOBILE_ROUTES.GET_ORDER_BY_ID])
  @Roles(Role.Tenant)
  async GetOrderByIdApi(
    @Param('id') id: string,
    @Request() req: any,
    @Response() res: any,
  ): Promise<void> {
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };

    let tenantId = '';

    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);

      tenantId = response.data.tenantId;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const result: any = await this.orderService.getOrderById(id);

    let userId = result.order.customerId;

    const userdetails = await this.userService.getProfile(userId, tenantId);

    let order = result.order;

    let userData = userdetails.data;

    const data = {
      order,
      userData,
    };

    return res.status(result.statusCode).json(data);
  }

  @Get([
    DESKTOP_ROUTES.GET_ORDER_BY_CUSOTOMER_ID,
    MOBILE_ROUTES.GET_ORDER_BY_CUSOTOMER_ID,
  ])
  @Roles(Role.Tenant)
  async GetOrderByCustomerIdApi(
    @Param('customerId') customerId: string,
    @Response() res: any,
  ): Promise<void> {
    const result: any = await this.orderService.getOrderByCustomerId(
      customerId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Get([
    DESKTOP_ROUTES.GET_ORDER_BY_ORDER_STATUS,
    MOBILE_ROUTES.GET_ORDER_BY_ORDER_STATUS,
  ])
  @Roles(Role.Tenant)
  async GetOrderByOrderStatusApi(
    @Param('status') status: string,
    @Response() res: any,
  ): Promise<void> {
    const result: any = await this.orderService.getOrderByOrderStatus(status);
    return res.status(result.statusCode).json(result);
  }

  @Get([DESKTOP_ROUTES.GET_ALL_ORDERS, MOBILE_ROUTES.GET_ALL_ORDERS])
  @Roles(Role.Tenant)
  async GetAllOrdersApi(@Response() res: any): Promise<void> {
    const result: any = await this.orderService.getAllOrders();
    return res.status(result.statusCode).json(result);
  }

  @Get([
    DESKTOP_ROUTES.GET_ORDER_BETWEEN_DATES,
    MOBILE_ROUTES.GET_ORDER_BETWEEN_DATES,
  ])
  @Roles(Role.Tenant)
  async GetOrdersBetweenDatesApi(
    @Response() res: any,
    @Param('from') from: string,
    @Param('to') to: string,
  ): Promise<void> {
    const result: any = await this.orderService.getOrdersBetweenDates(from, to);
    return res.status(result.statusCode).json(result);
  }

  @Get([
    DESKTOP_ROUTES.GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID,
    MOBILE_ROUTES.GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID,
  ])
  @Roles(Role.Tenant)
  async GetOrdersByDateRangeAndCustomerIdApi(
    @Response() res: any,
    @Param('from') from: string,
    @Param('customerId') customerId: string,
    @Param('to') to: string,
  ): Promise<void> {
    const result: any =
      await this.orderService.getOrdersByDateRangeAndCustomerId(
        from,
        to,
        customerId,
      );
    return res.status(result.statusCode).json(result);
  }

  @Get([DESKTOP_ROUTES.GET_ORDER_BY_DATE, MOBILE_ROUTES.GET_ORDER_BY_DATE])
  @Roles(Role.Tenant)
  async GetOrdersByDateApi(
    @Response() res: any,
    @Param('date') date: string,
  ): Promise<void> {
    const result: any = await this.orderService.getOrdersByDate(date);
    return res.status(result.statusCode).json(result);
  }

  @Get([
    DESKTOP_ROUTES.GET_ORDER_BY_DATE_AND_CUSTOMER_ID,
    MOBILE_ROUTES.GET_ORDER_BY_DATE_AND_CUSTOMER_ID,
  ])
  @Roles(Role.Tenant)
  async GetOrdersByDateAndCustomerIdApi(
    @Response() res: any,
    @Param('date') date: string,
    @Param('customerId') customerId: string,
  ): Promise<void> {
    const result: any = await this.orderService.getOrdersByDateAndCustomerId(
      date,
      customerId,
    );
    return res.status(result.statusCode).json(result);
  }

  @Put([DESKTOP_ROUTES.UPDATE_ORDER])
  async updateOrderApi(
    @Response() res: any,
    @Body() body: any,
    @Param('id') id: string,
  ): Promise<void> {
    const result: any = await this.orderService.updateOrder(body, id);
    return res.status(result.statusCode).json(result);
  }
}
export default OrderController;
