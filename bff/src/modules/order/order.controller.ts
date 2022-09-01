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
// import { LogoutDto, LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenDto, GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { ErrorDto, ErrorResponseDto } from './dto/error.dto';
// import { SigninDto, SigninResponseDto } from './dto/signin.dto';
// import { SignupDto, SignupResponseDto } from './dto/signup.dto';
// import { RequestedHeaderDto } from './dto/requestedHeader.dto';
// import { SigninInputDto, SignupInputDto } from './dto/userDetailsInput.dto';

@Controller('desktop')
class OrderController {
  constructor(
    private orderService: OrderService,
    private httpService: HttpService,
    private authService: AuthenticationService,
    private productService: ProductService,
    private variantService: VariantService,
    private cartService: CartService,
  ) {}

  @Post([DESKTOP_ROUTES.CREATE_ORDER, MOBILE_ROUTES.CREATE_ORDER])
  @Roles(Role.User)
  async CreateOrderAPI(
    @Request() req: any,
    @Response() res: any,
  ): Promise<void> {
    let customerId = '';
    const requestedHeader: any = {
      authorization: `${req.headers.authorization}`,
    };
    if (req.headers.authorization) {
      const response = await this.authService.getProfile(requestedHeader);
      customerId = response.data.username;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const userCart = await this.cartService.getUserCart(customerId);
    let data = null;
    const items = [];
    try {
      if (userCart.data) {
        for (let item of userCart?.data?.items) {
          const variant = item.itemDetails.variant;
          const productDetails = await this.productService.getOneProduct(
            variant.subcategoryId,
            variant.itemID,
          );
          const variantDetails = await this.variantService.getVariant(
            variant.subcategoryId,
            variant.itemID,
            variant.variantID,
          );
          items.push({
            productDetails: productDetails.data,
            variant: variantDetails.data,
            lineItemID: item.lineItemID,
            quantity: item.itemDetails.quantity,
          });
        }
      }
      data = {
        id: userCart?.data?.id,
        items,
      };
      const result: any = await this.orderService.createOrder(customerId, data);
      for (let i = 0; i < result.order.items.length; i++) {
        const image = result.order.items[i].productDetails;
        image['images'] = result.order.items[i].productDetails.images[0];
      }
      for (let i = 0; i < result.order.items.length; i++) {
        delete result.order.items[i].productDetails.active;
        delete result.order.items[i].productDetails.options;
        delete result.order.items[i].productDetails.variants;
        delete result.order.items[i].variant.active;
        delete result.order.items[i].variant.productId;
        delete result.order.items[i].variant.product;
        delete result.order.items[i].variant.options;
        delete result.order.items[i].variant.images;
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  @Get([DESKTOP_ROUTES.GET_ORDER_BY_ID, MOBILE_ROUTES.GET_ORDER_BY_ID])
  @Roles(Role.Tenant)
  async GetOrderByIdApi(
    @Param('id') id: string,
    @Response() res: any,
  ): Promise<void> {
    const result: any = await this.orderService.getOrderById(id);
    for (let i = 0; i < result.order.items.length; i++) {
      const image = result.order.items[i].productDetails;
      image['images'] = result.order.items[i].productDetails.images[0];
    }
    for (let i = 0; i < result.order.items.length; i++) {
      delete result.order.items[i].variant.product.active;
      delete result.order.items[i].variant.productId;
      delete result.order.items[i].variant.options;
      delete result.order.items[i].variant.active;
      delete result.order.items[i].variant.images;
      delete result.order.items[i].productDetails.name;
      delete result.order.items[i].productDetails.options;
      delete result.order.items[i].productDetails.active;
      delete result.order.items[i].productDetails.id;
      delete result.order.items[i].productDetails.subCategoryId;
      delete result.order.items[i].productDetails.variants;
    }
    return res.status(result.statusCode).json(result);
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
    for (let i = 0; i < result.order.length; i++) {
      for (let j = 0; j < result.order[i].items.length; j++) {
        const image = result.order[i].items[j].productDetails;
        image['images'] = result.order[i].items[j].productDetails.images[0];
      }
    }
    for (let i = 0; i < result.order.length; i++) {
      for (let j = 0; j < result.order[i].items.length; j++) {
        delete result.order[i].items[j].variant.product.active;
        delete result.order[i].items[j].variant.productId;
        delete result.order[i].items[j].variant.images;
        delete result.order[i].items[j].variant.options;
        delete result.order[i].items[j].variant.active;
        delete result.order[i].items[j].productDetails.name;
        delete result.order[i].items[j].productDetails.options;
        delete result.order[i].items[j].productDetails.active;
        delete result.order[i].items[j].productDetails.id;
        delete result.order[i].items[j].productDetails.subCategoryId;
        delete result.order[i].items[j].productDetails.variants;
      }
    }
    return res.status(result.statusCode).json(result);
  }

  @Put([DESKTOP_ROUTES.UPDATE_ORDER])
  async updateOrderApi(
    @Response() res: any,
    @Body() body: any,
    @Param('id') id: string,
  ): Promise<void> {
    const result: any = await this.orderService.updateOrder(body, id);
    for (let i = 0; i < result.order.items.length; i++) {
      const image = result.order.items[i].productDetails;
      image['images'] = result.order.items[i].productDetails.images[0];
    }
    for (let i = 0; i < result.order.items.length; i++) {
      delete result.order.items[i].variant.product.active;
      delete result.order.items[i].variant.productId;
      delete result.order.items[i].variant.options;
      delete result.order.items[i].variant.active;
      delete result.order.items[i].variant.images;
      delete result.order.items[i].productDetails.name;
      delete result.order.items[i].productDetails.options;
      delete result.order.items[i].productDetails.active;
      delete result.order.items[i].productDetails.id;
      delete result.order.items[i].productDetails.subCategoryId;
      delete result.order.items[i].productDetails.variants;
    }
    return res.status(result.statusCode).json(result);
  }
}
export default OrderController;
