import { CartDto } from './dto/createCart.dto';
import { CartRepository } from './cart.respository';
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: CartRepository);
    insertIntoCart(cartDto: CartDto, sessionUserId: string): Promise<{
        ok: boolean;
        data: {
            id: any;
            userID: string;
            createdAt: string;
            updatedAt: string;
            items: {
                lineItemID: any;
                itemDetails: CartDto;
            }[];
        };
    }>;
    insertIntoCartItems(cartDto: CartDto, cartID: string): Promise<{
        ok: boolean;
        data: CartDto;
    }>;
    updateItemInCart(cartDto: CartDto, cartID: string, userCartItems: any[]): Promise<{
        ok: boolean;
        data: any;
    }>;
    findUserCart(sessionUserId: string): Promise<import("aws-sdk/clients/dynamodb").DocumentClient.AttributeMap>;
    findItemInCart(cartItems: any[], variantIdToBeSearched: string): boolean;
    findAnonymousCart(anonymousCartId: string): Promise<import("aws-sdk/clients/dynamodb").DocumentClient.AttributeMap>;
    modifyItemInUserCart(cartID: string, cartItems: any[], lineItemID: string, quantity: number): Promise<{
        ok: boolean;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
    }>;
    removeItemFromUserCart(cartID: string, cartItems: any[], lineItemID: string): Promise<{
        ok: boolean;
    }>;
    deleteCart(cartID: string): Promise<void>;
}
