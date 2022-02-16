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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_respository_1 = require("./cart.respository");
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async insertIntoCart(cartDto, sessionUserId) {
        const createdCart = await this.cartRepository.insertIntoCart(cartDto, sessionUserId);
        return createdCart;
    }
    async insertIntoCartItems(cartDto, cartID) {
        const updatedCart = await this.cartRepository.insertIntoCartItems(cartDto, cartID);
        return updatedCart;
    }
    async updateItemInCart(cartDto, cartID, userCartItems) {
        const updatedCart = await this.cartRepository.updateItemInCart(cartDto, cartID, userCartItems);
        return updatedCart;
    }
    async findUserCart(sessionUserId) {
        const userCart = await this.cartRepository.findUserCart(sessionUserId);
        return userCart;
    }
    findItemInCart(cartItems, variantIdToBeSearched) {
        const itemExistsInCart = this.cartRepository.findItemInCart(cartItems, variantIdToBeSearched);
        return itemExistsInCart;
    }
    async findAnonymousCart(anonymousCartId) {
        const anonymousCart = await this.cartRepository.findAnonymousCart(anonymousCartId);
        return anonymousCart;
    }
    async modifyItemInUserCart(cartID, cartItems, lineItemID, quantity) {
        const modifiedUserCart = await this.cartRepository.modifyItemInUserCart(cartID, cartItems, lineItemID, quantity);
        return modifiedUserCart;
    }
    async removeItemFromUserCart(cartID, cartItems, lineItemID) {
        const result = await this.cartRepository.removeItemFromUserCart(cartID, cartItems, lineItemID);
        return result;
    }
    async deleteCart(cartID) {
        await this.cartRepository.deleteCart(cartID);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_respository_1.CartRepository])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map