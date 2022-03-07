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
export class CategoryService {
    constructor(private httpService: HttpService) {}
    
    async createCategory(data) {  
      const result :  ErrorResponseDto = await InvokeAPI('/categories', 'post', data, undefined, 3000);
      return result;
    }

    async getOneCategory(data) {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${data}`, 'get',undefined , undefined, 3000);
      return result;
    }

    async getCategories() {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories`, 'get',undefined , undefined, 3000);
      return result;
    }

    async deleteCategory(categoryId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}`, 'delete',undefined , undefined, 3000);
      return result;
    }

    async updateCategory(data,categoryId) {      
        const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}`, 'put', data, undefined, 3000);
        return result;
      }

    async updateCategoryStatus(data,categoryId) {  
        const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/status`, 'put', data, undefined, 3000);
        return result;
      }
      
    async addCategoryImage(data,categoryId) {  
        const result :  ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/images`, 'post', data, undefined, 3000);
        return result;
    }

    async getOneCategoryImage(categoryId,imageId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/images/${imageId}`, 'get',undefined , undefined, 3000);
      return result;
    }

    async getCategoryImages(categoryId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/images`, 'get',undefined , undefined, 3000);
      return result;
    }

    async deleteCategoryImage(categoryId,imageId) {    
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/images/${imageId}`, 'delete',undefined , undefined, 3000);
      return result;
    }

    async updateCategoryImage(data,categoryId,imageId) {   
      const result : ErrorResponseDto = await InvokeAPI(`/categories/${categoryId}/images/${imageId}`, 'put', data, undefined, 3000);
      return result;
    }
    
    
}
