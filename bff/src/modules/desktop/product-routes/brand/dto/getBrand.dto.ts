import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import {BrandInputDto} from './createBrand.dto'

export class GetBrandInputDto {
  @IsNotEmpty()
  id: string;

}

export class GetBrandResponseDto {
  statusCode: number;
  data: BrandInputDto;
}
