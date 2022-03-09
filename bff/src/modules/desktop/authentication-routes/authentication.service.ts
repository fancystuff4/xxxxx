import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InvokeAPI } from '../../../common/methods/invokeAPI';
import { ErrorResponseDto } from './dto/error.dto';
import { GetUserProfileResponseDto } from './dto/getUserProfile.dto';
import { LogoutResponseDto } from './dto/logout.dto';
import { GetRefreshTokenResponseDto } from './dto/refresh.dto';
import { SigninResponseDto } from './dto/signin.dto';
import { SignupResponseDto } from './dto/signup.dto';

@Injectable()
export class AuthenticationService {

    constructor(private httpService: HttpService) {}
    
    // async signup(data): Promise<signInResponse> {      
    //   const result = await InvokeAPI('/auth/local/signup', 'post', data, undefined, 3000);
    //   let response = plainToClass(signInResponse, result)
    //   return response;
    // }
    
    // async signin(data) {      
    //   const result = await InvokeAPI('/auth/local/signin', 'post', data, undefined, 3000);
    //   return result;
    // }

    // async refresh(data) {      
    //   const result : GetRefreshTokenResponseDto | ErrorResponseDto = await InvokeAPI('/auth/refresh', 'post', undefined, data, 3000);
    //   return result;
    // }

    // async logout(data) {      
    //   const result : LogoutResponseDto | ErrorResponseDto = await InvokeAPI('/auth/logout', 'post', undefined, data, 3000);
    //   return result;
    // }

    // async getProfile(data) {  
    //   const result = await InvokeAPI('/auth/profile', 'get', undefined, data, 3000);
    //   let response = plainToClass(signInResponse, result)
    //   console.log(`REsponse Data ${JSON.stringify(response)}`)    
    //   return response;
    // }
}
