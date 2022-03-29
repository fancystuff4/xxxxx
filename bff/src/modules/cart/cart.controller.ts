import { Body, Controller,Request, Get, Param, Post, Patch, Response, Delete, HttpStatus, HttpException } from "@nestjs/common";
import { MAIN_ROUTES } from "../../common/routes";
import { CartService } from "./cart.service";
import { DESKTOP_ROUTES } from "../authentication/helpers/routes";
import { AddToCartDto } from "./dto/cart.dto";
import { UpdateCartDto } from "./dto/cart.update.dto";

@Controller()
class CartController {

  constructor(private cartService: CartService) {}

    @Get(DESKTOP_ROUTES.CART)
    async getUserCart(
        @Param('userId') userId:string,
        @Response() res: any, 
        
    ) : Promise<any> {
        
      const result = await this.cartService.getUserCart(userId);
      return res.status(result.statusCode).json(result);
    }

    @Delete([DESKTOP_ROUTES.CART_REMOVE])
    async removeUserCartItem(
        @Param('userId') userId:string,
        @Param('cartId') cartId:string,
        @Param('lineItemId') lineItemId:string,
        @Response() res: any
    ) : Promise<any> {
        const result = await this.cartService.removeUserCartItem(userId,cartId,lineItemId);
        return res.status(result.statusCode).json(result);
    }

    @Post(DESKTOP_ROUTES.CART_ADD)
    async addToCart(
        @Response() res: any,
        @Body() body: AddToCartDto,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.cartService.getUserId(requestedHeader);
            if(response.data.role == 'Tenant'){
                body['userId'] = response.data.userId;
            }else{
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        }
        const result = await this.cartService.addToCart(body);
        return res.status(result.statusCode).json(result);
    }

    @Patch([DESKTOP_ROUTES.CART_REMOVE])
    async modifyUserCartItem(
        @Response() res: any,
        @Param('userId') userId:string,
        @Param('cartId') cartId:string,
        @Param('lineItemId') lineItemId:string,
        @Body() body: UpdateCartDto
    ) : Promise<any> {
        const result = await this.cartService.modifyUserCartItem(userId, cartId, lineItemId,body);
        return res.status(result.statusCode).json(result);
    }

   

}
export default CartController;