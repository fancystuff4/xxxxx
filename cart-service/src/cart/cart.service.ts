import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.respository';
import { CartDto } from './dto/createCart.dto';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async insertIntoCart(cartDto, sessionUserId: string) {
    const createdCart = await this.cartRepository.insertIntoCart(
      cartDto,
      sessionUserId,
    );
    return createdCart;
  }

  async insertIntoCartItems(cartDto: CartDto, cartID: string) {
    const updatedCart = await this.cartRepository.insertIntoCartItems(
      cartDto,
      cartID,
    );
    return updatedCart;
  }

  async updateItemInCart(
    cartDto: CartDto,
    cartID: string,
    userCartItems: any[],
  ) {
    const updatedCart = await this.cartRepository.updateItemInCart(
      cartDto,
      cartID,
      userCartItems,
    );
    return updatedCart;
  }

  async findUserCart(sessionUserId: string) {
    const userCart = await this.cartRepository.findUserCart(sessionUserId);
    return userCart;
  }

  findItemInCart(cartItems: any[], variantIdToBeSearched: string) {
    const itemExistsInCart = this.cartRepository.findItemInCart(
      cartItems,
      variantIdToBeSearched,
    );
    return itemExistsInCart;
  }

  async findAnonymousCart(anonymousCartId: string) {
    const anonymousCart = await this.cartRepository.findAnonymousCart(
      anonymousCartId,
    );
    return anonymousCart;
  }

  async modifyItemInUserCart(
    cartID: string,
    cartItems: any[],
    lineItemID: string,
    quantity: number,
  ) {
    const modifiedUserCart = await this.cartRepository.modifyItemInUserCart(
      cartID,
      cartItems,
      lineItemID,
      quantity,
    );
    return modifiedUserCart;
  }

  async removeItemFromUserCart(
    cartID: string,
    cartItems: any[],
    lineItemID: string,
  ) {
    const result = await this.cartRepository.removeItemFromUserCart(
      cartID,
      cartItems,
      lineItemID,
    );
    return result;
  }

  async deleteCart(cartID: string) {
    await this.cartRepository.deleteCart(cartID);
  }

  async assignAnonymousCart(cartID: string) {
    await this.cartRepository.assignAnonymousCart(cartID);
  }
}
