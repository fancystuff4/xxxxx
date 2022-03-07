import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InvokeAPI } from '../../../../common/methods/invokeAPI';
import { ErrorResponseDto } from './dto/error.dto';
// import { GetUserProfileResponseDto } from './dto/getUserProfile.dto';
// import { LogoutResponseDto } from './dto/logout.dto';
// import { GetRefreshTokenResponseDto } from './dto/refresh.dto';
// import { SigninResponseDto } from './dto/signin.dto';
// import { CreateBrandResponseDto } from './dto/createBrand.dto';
// import { GetBrandResponseDto } from './dto/getBrand.dto';
@Injectable()
export class ProductService {
    constructor(private httpService: HttpService) {}
    
    async createProduct(body,subCategoryId) {  
      const result :  ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products`, 'post', body, undefined, 3000);
      return result;
    }

    async getOneProduct(subCategoryId,productId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}`, 'get',undefined , undefined, 3000);
      return result;
    }

    async getProducts(subCategoryId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products`, 'get',undefined , undefined, 3000);
      return result;
    }

    async deleteProduct(subCategoryId,productId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}`, 'delete',undefined , undefined, 3000);
      return result;
    }

    

    async updateProductStatus(body,subCategoryId,productId) {  
        const result : ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}/active`, 'put', body, undefined, 3000);
        return result;
      }

    async addProductImages(body,subCategoryId,productId) {  
        const result :  ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}/images`, 'post', body, undefined, 3000);
        return result;
      }

    async getOneProductImage(subCategoryId,productId,imageId) {  
        const result :  ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}/images/${imageId}`, 'get', undefined, undefined, 3000);
        return result;
      }

    async getProductImages(subCategoryId,productId) {  
        const result :  ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}/images`, 'get', undefined, undefined, 3000);
        return result;
      }

    async deleteProductImage(subCategoryId,productId,imageId) {  
        const result :  ErrorResponseDto = await InvokeAPI(`/subCategories/${subCategoryId}/products/${productId}/images/${imageId}`, 'delete', undefined, undefined, 3000);
        return result;
      }
    
    
}
