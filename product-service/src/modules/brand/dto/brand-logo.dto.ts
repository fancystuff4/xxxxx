import { IsNotEmpty, IsOptional } from 'class-validator';
import { BrandLogoType } from 'src/database/entities';

export class BrandLogoDto {
    @IsNotEmpty()
    brandId: string

    @IsNotEmpty()
    logo: BrandLogoType
}