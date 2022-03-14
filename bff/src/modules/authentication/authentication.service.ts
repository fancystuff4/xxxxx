import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InvokeAPI } from "src/common/methods/invokeAPI";

@Injectable()
export class AuthenticationService {
    
    constructor(private httpService: HttpService) {}
    
    async signup(data): Promise<any> {      
      return await InvokeAPI('/auth/local/signup', 'post', data, undefined, 3000);
    }
    
    async signin(data): Promise<any> {      
      return await InvokeAPI('/auth/local/signin', 'post', data, undefined, 3000);
    }

    async refresh(data): Promise<any> {      
      return await InvokeAPI('/auth/refresh', 'post', undefined, data, 3000);
    }

    async logout(data) {      
      return await InvokeAPI('/auth/logout', 'post', undefined, data, 3000);
    }

    async getProfile(data): Promise<any> {  
      return await InvokeAPI('/auth/profile', 'get', undefined, data, 3000);
    }

}