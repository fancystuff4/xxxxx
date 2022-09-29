// import { IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
// import { ProductOptionCreateDto } from '../productOption';

export class ProductCreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  description: string;
}

// export class ProductAndOptionCreateDto extends IntersectionType(
//   ProductCreateDto,
//   ProductOptionCreateDto,
// ) {}
