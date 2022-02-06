import { IsEnum, IsNotEmpty } from 'class-validator';
import { BrandLogoSize } from 'src/database/entities/brand';

export class BrandLogoCreateDto {
  @IsNotEmpty()
  src: string;

  @IsNotEmpty()
  @IsEnum(BrandLogoSize, { message: 'Invalid logo sizeType value' })
  sizeType: BrandLogoSize;
}
