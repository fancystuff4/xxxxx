import { Body, Controller,Request, Get, Param, Post, Patch, Response, Delete, HttpStatus, HttpException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { MAIN_ROUTES } from "../../common/routes";
import { AuthenticationService } from "../authentication/authentication.service";
import { ProductService } from "../product/product/product.service";
import { VariantService } from "../product/product/variant/variant.service";
import { CartService } from "./cart.service";
import { AddToCartDto } from "./helpers/dto/cart.add.dto";
import { UpdateCartDto } from "./helpers/dto/cart.update.dto";
import { DESKTOP_ROUTES, MOBILE_ROUTES } from "./helpers/routes";

@Controller()
@UseGuards(AuthGuard)
class CartController {

    constructor(
        private cartService: CartService, 
        private authService: AuthenticationService,
        private productService: ProductService,
        private variantService: VariantService
    ) {}

    @Get([DESKTOP_ROUTES.CART, MOBILE_ROUTES.CART])
    async getUserCart(
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        let userId = ""
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            userId = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const cartDetails = await this.cartService.getUserCart(userId);
        console.log("cartdetails " + JSON.stringify(cartDetails))
        let data = null
        const items = []
        try {
            for (let item of cartDetails?.data?.items) {
                const variant = item.itemDetails.variant
                const productDetails = await this.productService.getOneProduct(variant.subcategoryId, variant.itemID)
                const variantDetails = await this.variantService.getVariant(variant.subcategoryId, variant.itemID, variant.variantID)
                items.push({
                    productDetails: productDetails.data,
                    variant: variantDetails.data,
                    lineItemID: item.lineItemID,
                    quantity: item.itemDetails.quantity
                })            
            }
            data = {
                id: cartDetails?.data?.id,
                items
            }
        } catch (error) {
            
        }
        
        const result = {
            statusCode: 200,
            data
        }
        return res.status(200).json(result)
    }

    @Delete([DESKTOP_ROUTES.CART_REMOVE, MOBILE_ROUTES.CART_REMOVE])
    async removeUserCartItem(
        @Param('cartId') cartId:string,
        @Param('lineItemId') lineItemId:string,
        @Response() res: any,
        @Request() req: any
    ) : Promise<any> {
        let userId = ""
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            userId = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const result = await this.cartService.removeUserCartItem(userId, cartId, lineItemId);
        return res.status(result.statusCode).json(result);
    }

    @Post([DESKTOP_ROUTES.CART_ADD, MOBILE_ROUTES.CART_ADD])
    async addToCart(
        @Response() res: any,
        @Body() body: AddToCartDto,
        @Request() req: any
    ) : Promise<any> {
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            body['userId'] = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const result = await this.cartService.addToCart(body);
        return res.status(result.statusCode).json(result);
    }

    @Post([DESKTOP_ROUTES.CART_ADD_ALL, MOBILE_ROUTES.CART_ADD_ALL])
    async addToCartAll(
        @Response() res: any,
        @Body() body: AddToCartDto[],
        @Request() req: any
    ) : Promise<any> {
        let userId = ""
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            userId = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        for (const item of body) {
            item['userId'] = userId
            await this.cartService.addToCart(item);
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Added To Cart Successfully"
        })
    }

    @Patch([DESKTOP_ROUTES.CART_REMOVE, MOBILE_ROUTES.CART_REMOVE])
    async modifyUserCartItem(
        @Response() res: any,
        @Param('cartId') cartId:string,
        @Param('lineItemId') lineItemId:string,
        @Body() body: UpdateCartDto,
        @Request() req: any
    ) : Promise<any> {
        let userId = ""
        const requestedHeader : any = { 
            'authorization' : `${req.headers.authorization}`
        }
        if(req.headers.authorization){
            const response = await this.authService.getProfile(requestedHeader);
            userId = response.data.username;
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const result = await this.cartService.modifyUserCartItem(userId, cartId, lineItemId, body);
        return res.status(result.statusCode).json(result);
    }   

}
export default CartController;