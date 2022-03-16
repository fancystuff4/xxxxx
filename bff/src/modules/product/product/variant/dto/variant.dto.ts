
import { ApiProperty,PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class VariantCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  price: number;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @IsUUID()
  @ApiProperty()
  productId: string;

  @IsArray()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => VariantOptionCreateObj)
  options: VariantOptionCreateObj[];
}

export class VariantOptionCreateObj {
    @IsOptional()
    @ApiProperty()
    @IsUUID()
    id: string;
  
    @IsUUID()
    @ApiProperty()
    subCatOptionId: string;
  
    @IsOptional()
    @ApiProperty()
    subCatOption: string;
  
    @IsOptional()
    @ApiProperty()
    variant: string;
  
    @IsOptional()
    @ApiProperty()
    @IsBoolean()
    active: boolean;
  
    @IsNotEmpty()
    @ApiProperty()
    value: string;
  }

export class VariantUpdateDto extends PickType(VariantCreateDto, [
'active',
'price',
] as const) {}

