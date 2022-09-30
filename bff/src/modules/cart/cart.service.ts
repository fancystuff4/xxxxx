import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from 'src/common/methods/invokeAPI';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';

@Injectable()
export class CartService {
  async getUserCart(userId): Promise<any> {
    return await InvokeAPI(
      `/dev/users/${userId}/cart`,
      'get',
      undefined,
      undefined,
      Number(process.env.CART_SERVICE_PORT),
    );
  }

  async removeUserCartItem(userID, cartID, lineItemID): Promise<any> {
    return await InvokeAPI(
      `/dev/users/${userID}/cart/${cartID}/items/${lineItemID}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.CART_SERVICE_PORT),
    );
  }

  async deleteCart(userID, cartID): Promise<any> {
    return await InvokeAPI(
      `/dev/users/${userID}/cart/${cartID}`,
      'delete',
      undefined,
      undefined,
      Number(process.env.CART_SERVICE_PORT),
    );
  }

  async addToCart(data): Promise<any> {
    return await InvokeAPI('/dev/addtocart', 'post', data, undefined, Number(process.env.CART_SERVICE_PORT));
  }

  async modifyUserCartItem(userID, cartID, lineItemID, data): Promise<any> {
    return await InvokeAPI(
      `/dev/users/${userID}/cart/${cartID}/items/${lineItemID}`,
      'patch',
      data,
      undefined,
      Number(process.env.CART_SERVICE_PORT),
    );
  }
}
