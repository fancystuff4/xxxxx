import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { InvokeAPI } from "src/common/methods/invokeAPI";
import { ProfileWrapperDto } from "./helpers/dto/profile_wrapper.dto";
import { SignInWrapperDto } from "./helpers/dto/sign_in_wrapper.dto";

@Injectable()
export class AuthenticationService {
    
    constructor(private httpService: HttpService) {}
    
    async signup(data): Promise<ProfileWrapperDto> {      
      const result = await InvokeAPI('/auth/local/signup', 'post', data, undefined, 3000);
      const response = plainToClass(ProfileWrapperDto, result)
      return response;
    }
    
    async signin(data): Promise<SignInWrapperDto> {      
      const result = await InvokeAPI('/auth/local/signin', 'post', data, undefined, 3000);
      const response = plainToClass(SignInWrapperDto, result);
      return response;
    }

    async refresh(data): Promise<SignInWrapperDto> {      
      const result = await InvokeAPI('/auth/refresh', 'post', undefined, data, 3000);
      const response = plainToClass(SignInWrapperDto, result);
      return response;
    }

    async logout(data) {      
      const result = await InvokeAPI('/auth/logout', 'post', undefined, data, 3000);
      return result;
    }

    async getProfile(data): Promise<ProfileWrapperDto> {  
      const result = await InvokeAPI('/auth/profile', 'get', undefined, data, 3000);
      let response = plainToClass(ProfileWrapperDto, result)
      return response;
    }
}