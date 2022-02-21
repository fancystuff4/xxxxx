import { IntersectionType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { VariantOptionCreateDto } from '../variantOption';

export class VariantCreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsUUID()
  productId: string;
}

export class VariantAndOptionCreateDto extends IntersectionType(
  VariantCreateDto,
  VariantOptionCreateDto,
) {}
