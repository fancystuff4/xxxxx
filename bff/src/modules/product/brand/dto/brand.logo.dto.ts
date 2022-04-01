import { IsNotEmpty,IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class BrandLogoDto {
    @ApiProperty()
    @IsNotEmpty()
    src: string;
  
    @IsNotEmpty()
    @ApiProperty()
    @IsIn(['SMALL','MEDIUM','LARGE'],{message:'Invalid logo sizeType value'})
    sizeType: string;
}

export class BrandLogoUpdateDto {
    @IsNotEmpty()
    @ApiProperty()
    src: string;
}




