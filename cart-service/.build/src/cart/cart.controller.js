"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const createCart_dto_1 = require("./dto/createCart.dto");
const updateCart_dto_1 = require("./dto/updateCart.dto");
const uuid_1 = require("uuid");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(cartDto, res, req) {
        const auth = true;
        if (auth) {
            const sessionUserId = 'user-1';
            try {
                const userCart = await this.cartService.findUserCart(sessionUserId);
                if (!userCart) {
                    const newCart = await this.cartService.insertIntoCart(cartDto, sessionUserId);
                    if (newCart.ok) {
                        return res.status(common_1.HttpStatus.CREATED).json({
                            ok: true,
                            message: 'Add to Cart: A new cart has been created.',
                            data: newCart.data,
                        });
                    }
                    else {
                        return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                            ok: false,
                            message: 'Add to Cart: Error Trying to Create Cart',
                        });
                    }
                }
                else {
                    const itemExistsInCart = this.cartService.findItemInCart(userCart.items, cartDto.variant.variantID);
                    var updatedCart;
                    if (itemExistsInCart) {
                        updatedCart = await this.cartService.updateItemInCart(cartDto, userCart.id, userCart.items);
                        if (updatedCart.ok) {
                            return res.status(common_1.HttpStatus.OK).json({
                                ok: true,
                                message: 'Add to Cart: An existing item has been modified.',
                                data: updatedCart.data,
                            });
                        }
                        else {
                            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                                ok: false,
                                message: 'Error Trying to Update Cart',
                            });
                        }
                    }
                    else {
                        updatedCart = await this.cartService.insertIntoCartItems(cartDto, userCart.id);
                        if (updatedCart.ok) {
                            return res.status(common_1.HttpStatus.OK).json({
                                ok: true,
                                message: 'Add to Cart: A new item has been added.',
                                data: updatedCart.data,
                            });
                        }
                        else {
                            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                                ok: false,
                                message: 'Add to Cart: Error Trying to Update Cart',
                            });
                        }
                    }
                }
            }
            catch (error) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: 'Add to Cart: Error Trying to reach DB',
                    errors: error,
                });
            }
        }
        else {
            try {
                if (req.cookies['anonymousCart_id'] === undefined) {
                    const nullUserId = (0, uuid_1.v4)();
                    const anonymousCart = await this.cartService.insertIntoCart(cartDto, nullUserId);
                    res.cookie('anonymousCart_id', anonymousCart.data.id, {
                        httpOnly: true
                    });
                    if (anonymousCart.ok) {
                        return res.status(common_1.HttpStatus.CREATED).json({
                            ok: true,
                            message: 'Add to Anonymous Cart: An anonymous cart has been created.',
                            data: anonymousCart.data,
                        });
                    }
                    else {
                        return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                            ok: false,
                            message: 'Add to Anonymous Cart: Error Trying to Create Anonymous Cart',
                        });
                    }
                }
                else {
                    const anonymousCart = await this.cartService.findAnonymousCart(req.cookies['anonymousCart_id']);
                    const itemExistsInAnonymousCart = this.cartService.findItemInCart(anonymousCart.items, cartDto.variant.variantID);
                    var updatedAnonymousCart;
                    if (itemExistsInAnonymousCart) {
                        updatedAnonymousCart = await this.cartService.updateItemInCart(cartDto, anonymousCart.id, anonymousCart.items);
                        if (updatedAnonymousCart.ok) {
                            return res.status(common_1.HttpStatus.OK).json({
                                ok: true,
                                message: 'Add to Anonymous Cart: An existing item has been modified.',
                                data: updatedAnonymousCart.data,
                            });
                        }
                        else {
                            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                                ok: false,
                                message: 'Add to Anonymous Cart: Error Trying to Update Anonymous Cart',
                            });
                        }
                    }
                    else {
                        updatedAnonymousCart = await this.cartService.insertIntoCartItems(cartDto, anonymousCart.id);
                        if (updatedAnonymousCart.ok) {
                            return res.status(common_1.HttpStatus.OK).json({
                                ok: true,
                                message: 'Add to Anonymous Cart: A new item has been added.',
                                data: updatedAnonymousCart.data,
                            });
                        }
                        else {
                            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                                ok: false,
                                message: 'Add to Anonymous Cart: Error Trying to Update Anonymous Cart',
                            });
                        }
                    }
                }
            }
            catch (error) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: 'Add to Anonymous Cart: Error Trying to reach DB',
                    errors: error,
                });
            }
        }
    }
    async getUserCart(id, res) {
        try {
            const userCart = await this.cartService.findUserCart(id);
            if (userCart) {
                return res.status(common_1.HttpStatus.OK).json({
                    cart: userCart,
                });
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({
                    message: `Get User Cart: The user with id '${id}' has no existing cart`,
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Get User Cart: Error Trying to reach DB',
                errors: error,
            });
        }
    }
    async modifyUserCartItem(userID, cartID, lineItemID, updateCartDto, res) {
        if (updateCartDto.quantity && typeof (updateCartDto.quantity) === 'number') {
            try {
                const userCart = await this.cartService.findUserCart(userID);
                if (userCart && userCart.id === cartID) {
                    const modifiedUserCart = await this.cartService.modifyItemInUserCart(userCart.id, userCart.items, lineItemID, updateCartDto.quantity);
                    if (modifiedUserCart.ok) {
                        return res.status(common_1.HttpStatus.OK).json({
                            ok: true,
                            message: 'Update Cart: an existing item has been modified.',
                            data: modifiedUserCart.data,
                        });
                    }
                    else {
                        return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                            ok: false,
                            message: `Update Cart: the item doesn't exist in user's cart`,
                        });
                    }
                }
                else {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        message: `Update Cart: The user with id '${userID}' has no existing cart with id '${cartID}'`,
                    });
                }
            }
            catch (error) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: 'Update Cart: Error Trying to reach DB',
                    errors: error,
                });
            }
        }
        else {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                ok: false,
                message: 'Update Cart: Please specify the quantity of the item correctly',
            });
        }
    }
    async removeUserCartItem(userID, cartID, lineItemID, res) {
        try {
            const userCart = await this.cartService.findUserCart(userID);
            if (userCart && userCart.id === cartID) {
                const result = await this.cartService.removeItemFromUserCart(userCart.id, userCart.items, lineItemID);
                if (result.ok) {
                    const userCart = await this.cartService.findUserCart(userID);
                    if (!userCart.items.length) {
                        await this.cartService.deleteCart(userCart.id);
                    }
                    return res.status(common_1.HttpStatus.OK).json({
                        ok: true,
                        message: `Remove Item from Cart: An existing item has been removed from user's cart.`
                    });
                }
                else {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        ok: false,
                        message: `Remove Item from Cart: The item doesn't exist in user's cart.`,
                    });
                }
            }
            else {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: `Remove Item from Cart: The user with id '${userID}' has no existing cart with id '${cartID}'`,
                });
            }
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Remove Item from Cart: Error Trying to reach DB',
                errors: error,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('addtocart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCart_dto_1.CartDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)('users/:id/cart'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getUserCart", null);
__decorate([
    (0, common_1.Patch)('users/:userID/cart/:cartID/items/:lineItemID'),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Param)('cartID')),
    __param(2, (0, common_1.Param)('lineItemID')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, updateCart_dto_1.UpdateCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "modifyUserCartItem", null);
__decorate([
    (0, common_1.Delete)('users/:userID/cart/:cartID/items/:lineItemID'),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Param)('cartID')),
    __param(2, (0, common_1.Param)('lineItemID')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeUserCartItem", null);
CartController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map