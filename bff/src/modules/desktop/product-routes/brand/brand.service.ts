import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../../common/methods/invokeAPI';
import { ErrorResponseDto } from './dto/error.dto';
// import { GetUserProfileResponseDto } from './dto/getUserProfile.dto';
// import { LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { SigninResponseDto } from './dto/signin.dto';
import { CreateBrandResponseDto } from './dto/createBrand.dto';
import { GetBrandResponseDto } from './dto/getBrand.dto';
@Injectable()
export class BrandService {
    constructor(private httpService: HttpService) {}
    
    async createBrand(data) {  
      const result : CreateBrandResponseDto | ErrorResponseDto = await InvokeAPI('/brands', 'post', data, undefined, 3000);
      return result;
    }

    async getOneBrand(data) {    
      const result : ErrorResponseDto = await InvokeAPI(`/brands/${data}`, 'get',undefined , undefined, 3000);
      return result;
    }

    async getBrands() {    
      const result : ErrorResponseDto = await InvokeAPI(`/brands`, 'get',undefined , undefined, 3000);
      return result;
    }

    async deleteBrand(brandId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/brands/${brandId}`, 'delete',undefined , undefined, 3000);
      return result;
    }

    async updateBrand(data,brandId) {      
        const result : CreateBrandResponseDto | ErrorResponseDto = await InvokeAPI(`/brands/${brandId}`, 'put', data, undefined, 3000);
        return result;
      }

    async updateBrandStatus(data,brandId) {  
        const result : ErrorResponseDto = await InvokeAPI(`/brands/${brandId}/active`, 'put', data, undefined, 3000);
        return result;
    }

    async addBrandLogo(data,brandId) {  
      const result :  ErrorResponseDto = await InvokeAPI(`/brands/${brandId}/logos`, 'post', data, undefined, 3000);
      return result;
    }

    async getBrandLogos(brandId) {  
      const result :  ErrorResponseDto = await InvokeAPI(`/brands/${brandId}/logos`, 'get', undefined, undefined, 3000);
      return result;
    }

    async updateBrandLogo(data,brandId,logoId) {      
      const result :  ErrorResponseDto = await InvokeAPI(`/brands/${brandId}/logos/${logoId}`, 'put', data, undefined, 3000);
      return result;
    }

    async deleteBrandLogo(brandId,logoId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/brands/${brandId}/logos/${logoId}`, 'delete',undefined , undefined, 3000);
      return result;
    }

    
    
}
