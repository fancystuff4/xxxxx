import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from 'src/common/methods/invokeAPI';
import { AuthenticationService } from 'src/modules/authentication/authentication.service';

@Injectable()
export class CartService {
        
    async getUserCart(userId): Promise<any> {   
      return await InvokeAPI(`/users/${userId}/cart`, 'get', undefined, undefined, 3001);
    }
    
    async removeUserCartItem(userID,cartID,lineItemID): Promise<any> {      
      return await InvokeAPI(`/users/${userID}/cart/${cartID}/items/${lineItemID}`, 'delete', undefined, undefined, 3001);
    }

    async addToCart(data): Promise<any> {  
      return await InvokeAPI('/addtocart', 'post', data, undefined, 3001);
    }

    async modifyUserCartItem(userID,cartID,lineItemID,data):Promise<any>  {      
      return await InvokeAPI(`/users/${userID}/cart/${cartID}/items/${lineItemID}`, 'patch', data, undefined, 3001);
    }
