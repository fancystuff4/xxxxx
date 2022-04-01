
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty,PartialType } from '@nestjs/swagger';


export class ProductCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  active: boolean;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOptionCreateObj)
  options: ProductOptionCreateObj[];

}

export class ProductOptionCreateObj {
    @IsOptional()
    @ApiProperty()
    @IsUUID()
    productId: string;
  
    @IsUUID()
    @ApiProperty()
    subCatOptionId: string;
  
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean;
  
    @IsArray({
      message: 'Available values for an option should be an array',
    })
    @ArrayNotEmpty({
      message: 'Available values for an option should be a non-emtpy array',
    })
    availableValues: string[];
  }
export class ProductUpdateDto extends PartialType(ProductCreateDto) {}

