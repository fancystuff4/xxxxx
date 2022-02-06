import { IsNotEmpty } from 'class-validator';

export class BrandLogoUpdateDto {
  @IsNotEmpty()
  src: string;
}
