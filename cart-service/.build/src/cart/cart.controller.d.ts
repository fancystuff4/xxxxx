import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { CartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addToCart(cartDto: CartDto, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    getUserCart(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    modifyUserCartItem(userID: string, cartID: string, lineItemID: string, updateCartDto: UpdateCartDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeUserCartItem(userID: string, cartID: string, lineItemID: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
