import { Controller, Post, Body, Res, HttpStatus, Get, Req, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { CartDto } from './dto/createCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';

@Controller()
export class CartController {
    constructor(private cartService: CartService) {}

    // @Post('addtocart')
    // async addToCart(@Body() cartDto: CartDto, @Res() res: Response, @Req() req: Request) {
    //     console.log(req.cookies['anonymousCart_id']);
    //     var auth:boolean;
    //     if(cartDto.userId != undefined){
    //         auth= true;
    //     }else{
    //         auth= false;
    //     }
    //     if(auth){ // when the user is logged in
    //         const sessionUserId: string = cartDto.userId;
    //         try {
    //             const userCart = await this.cartService.findUserCart(sessionUserId);
    //             if(!userCart){ // when the logged in user has no existing cart
    //                 const newCart: any = await this.cartService.insertIntoCart(cartDto, sessionUserId);
    //                 if (newCart.ok) {
    //                     return res.status(HttpStatus.CREATED).json({
    //                         statusCode: HttpStatus.CREATED,
    //                         message: 'Add to Cart: A new cart has been created.',
    //                         data: newCart.data,
    //                     });
    //                 } else {
    //                     return res.status(HttpStatus.BAD_REQUEST).json({
    //                         statusCode: HttpStatus.BAD_REQUEST,
    //                         message: 'Add to Cart: Error Trying to Create Cart',
    //                     });
    //                 }
    //             } else { // when the user already has a cart
    //                 const itemExistsInCart = this.cartService.findItemInCart(userCart.items, cartDto.variant.variantID);
    //                 var updatedCart: any;
    //                 if(itemExistsInCart) { // when the item already exists in his cart
    //                     updatedCart = await this.cartService.updateItemInCart(cartDto, userCart.id, userCart.items);
    //                     if (updatedCart.ok) {
    //                         return res.status(HttpStatus.OK).json({
    //                             statusCode: HttpStatus.OK,
    //                             message: 'Add to Cart: An existing item has been modified.',
    //                             data: updatedCart.data,
    //                         });
    //                     } else {
    //                         return res.status(HttpStatus.BAD_REQUEST).json({
    //                             statusCode: HttpStatus.BAD_REQUEST,
    //                             message: 'Add to Cart: Error Trying to Update Cart',
    //                         });
    //                     }
    //                 } else { // when the item doesn't exist in his cart
    //                     updatedCart = await this.cartService.insertIntoCartItems(cartDto, userCart.id);
    //                     if (updatedCart.ok) {
    //                         return res.status(HttpStatus.OK).json({
    //                             statusCode: HttpStatus.OK,
    //                             message: 'Add to Cart: A new item has been added.',
    //                             data: updatedCart.data,
    //                         });
    //                     } else {
    //                         return res.status(HttpStatus.BAD_REQUEST).json({
    //                             statusCode: HttpStatus.BAD_REQUEST,
    //                             message: 'Add to Cart: Error Trying to Update Cart',
    //                         });
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //                 message: 'Add to Cart: Error Trying to reach Database',
    //                 errors: error,
    //             });
    //         }
    //     } else { // when the user is not logged in
    //         try {
    //             if(req.cookies['anonymousCart_id'] === undefined) { // when adding an item to cart for the first time
    //                 const nullUserId: string = uuid();
    //                 const anonymousCart: any = await this.cartService.insertIntoCart(cartDto, nullUserId);
    //                 res.cookie('anonymousCart_id', anonymousCart.data.id, {
    //                     httpOnly: true
    //                 });
    //                 if (anonymousCart.ok) {
    //                     return res.status(HttpStatus.CREATED).json({
    //                         statusCode: HttpStatus.CREATED,
    //                         message: 'Add to Anonymous Cart: An anonymous cart has been created.',
    //                         data: anonymousCart.data,
    //                     });
    //                 } else {
    //                     return res.status(HttpStatus.BAD_REQUEST).json({
    //                         statusCode: HttpStatus.BAD_REQUEST,
    //                         message: 'Add to Anonymous Cart: Error Trying to Create Anonymous Cart',
    //                     });
    //                 }
    //             } else { // when an anonymous cart already exists
    //                 const anonymousCart: any = await this.cartService.findAnonymousCart(req.cookies['anonymousCart_id']);
    //                 const itemExistsInAnonymousCart = this.cartService.findItemInCart(anonymousCart.items, cartDto.variant.variantID);
    //                 var updatedAnonymousCart: any;
    //                 if(itemExistsInAnonymousCart) {
    //                     updatedAnonymousCart = await this.cartService.updateItemInCart(cartDto, anonymousCart.id, anonymousCart.items);
    //                     if (updatedAnonymousCart.ok) {
    //                         return res.status(HttpStatus.OK).json({
    //                             statusCode: HttpStatus.OK,
    //                             message: 'Add to Anonymous Cart: An existing item has been modified.',
    //                             data: updatedAnonymousCart.data,
    //                         });
    //                     } else {
    //                         return res.status(HttpStatus.BAD_REQUEST).json({
    //                             statusCode: HttpStatus.BAD_REQUEST,
    //                             message: 'Add to Anonymous Cart: Error Trying to Update Anonymous Cart',
    //                         });
    //                     }
    //                 } else {
    //                     updatedAnonymousCart = await this.cartService.insertIntoCartItems(cartDto, anonymousCart.id);
    //                     if (updatedAnonymousCart.ok) {
    //                         return res.status(HttpStatus.OK).json({
    //                             statusCode: HttpStatus.OK,
    //                             message: 'Add to Anonymous Cart: A new item has been added.',
    //                             data: updatedAnonymousCart.data,
    //                         });
    //                     } else {
    //                         return res.status(HttpStatus.BAD_REQUEST).json({
    //                             statusCode: HttpStatus.BAD_REQUEST,
    //                             message: 'Add to Anonymous Cart: Error Trying to Update Anonymous Cart',
    //                         });
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    //                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //                 message: 'Add to Anonymous Cart: Error Trying to reach Database',
    //                 errors: error,
    //             });
    //         }
    //     }
    // }

    @Get('users/:id/cart')
    async getUserCart(@Param('id') id: string, @Res() res: Response) {
        try {
            const userCart: any = await this.cartService.findUserCart(id);
            if (userCart) {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    cart: userCart,
                });
            } else {
                return res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: `Get User Cart: The user with id '${id}' has no existing cart`,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Get User Cart: Error Trying to reach Database',
                errors: error,
            });
        }
    }

    @Patch('users/:userID/cart/:cartID/items/:lineItemID')
    async modifyUserCartItem(
        @Param('userID') userID: string,
        @Param('cartID') cartID: string,
        @Param('lineItemID') lineItemID: string,
        @Body() updateCartDto: UpdateCartDto,
        @Res() res: Response
    ) {
        if(updateCartDto.quantity && typeof(updateCartDto.quantity) === 'number') {
            try {
                const userCart: any = await this.cartService.findUserCart(userID);
                if (userCart && userCart.id === cartID) {
                    const modifiedUserCart = await this.cartService.modifyItemInUserCart(userCart.id, userCart.items, lineItemID, updateCartDto.quantity);
                    if (modifiedUserCart.ok) {
                        return res.status(HttpStatus.OK).json({
                            statusCode: HttpStatus.OK,
                            message: 'Update Cart: an existing item has been modified.',
                            data: modifiedUserCart.data,
                        });
                    } else {
                        return res.status(HttpStatus.BAD_REQUEST).json({
                            statusCode: HttpStatus.BAD_REQUEST,
                            message: `Update Cart: the item doesn't exist in user's cart`,
                        });
                    }
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: `Update Cart: The user with id '${userID}' has no existing cart with id '${cartID}'`,
                    });
                }
            } catch (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Update Cart: Error Trying to reach Database',
                    errors: error,
                });
            }
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Update Cart: Please specify the quantity of the item correctly',
            });
        }
    }

    @Delete('users/:userID/cart/:cartID/items/:lineItemID')
    async removeUserCartItem(
        @Param('userID') userID: string,
        @Param('cartID') cartID: string,
        @Param('lineItemID') lineItemID: string,
        @Res() res: Response
    ) {
        try {
            const userCart: any = await this.cartService.findUserCart(userID);
            if (userCart && userCart.id === cartID) {
                const result = await this.cartService.removeItemFromUserCart(userCart.id, userCart.items, lineItemID);
                if(result.ok) {
                    const userCart: any = await this.cartService.findUserCart(userID);
                    if(!userCart.items.length){ // while deleting the last item in the user cart
                        await this.cartService.deleteCart(userCart.id);
                    }
                    return res.status(HttpStatus.OK).json({
                        statusCode: HttpStatus.OK,
                        message: `Remove Item from Cart: An existing item has been removed from user's cart.`,
                        data: result.data
                    });
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: `Remove Item from Cart: The item doesn't exist in user's cart.`,
                    });
                }
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Remove Item from Cart: The user with id '${userID}' has no existing cart with id '${cartID}'`,
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Remove Item from Cart: Error Trying to reach Database',
                errors: error,
            });
        }
    }
    
    @Post('addtocart')
    async addToCart(@Body() body: CartDto, @Res() res: Response, @Req() req: Request) {
        const userCart = await this.cartService.findUserCart(body.userId);
        if(!userCart){
            const newCart: any = await this.cartService.insertIntoCart(body, body.userId);
            if (newCart.ok) {
                return res.status(HttpStatus.CREATED).json({
                    statusCode: HttpStatus.CREATED,
                    message: 'Add to Cart: A new cart has been created.',
                    data: newCart.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Add to Cart: Error Trying to Create Cart',
                });
            }
        } else { 
            const itemExistsInCart = this.cartService.findItemInCart(userCart.items, body.variant.variantID);
            var updatedCart: any;
            if(itemExistsInCart) { 
                updatedCart = await this.cartService.updateItemInCart(body, userCart.id, userCart.items);
                if (updatedCart.ok) {
                    return res.status(HttpStatus.OK).json({
                        statusCode: HttpStatus.OK,
                        message: 'Add to Cart: An existing item has been modified.',
                        data: updatedCart.data,
                    });
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Add to Cart: Error Trying to Update Cart',
                    });
                }
            } else { // when the item doesn't exist in his cart
                updatedCart = await this.cartService.insertIntoCartItems(body, userCart.id);
                if (updatedCart.ok) {
                    return res.status(HttpStatus.OK).json({
                        statusCode: HttpStatus.OK,
                        message: 'Add to Cart: A new item has been added.',
                        data: updatedCart.data,
                    });
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Add to Cart: Error Trying to Update Cart',
                    });
                }
            }
        }
        
    }
}