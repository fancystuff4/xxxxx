import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SubCatOptCreateObj {
    @ApiProperty()
    @IsNotEmpty({ message: 'optionName should be non-empty' })
    optionName: string;

    @IsArray({
        message: 'Available values for an option should be an array',
    })
    @ArrayNotEmpty({
        message: 'Available values for an option should be a non-emtpy array',
    })
    availableValues: string[];

    
    @IsOptional()
    @IsIn(['COLOR','GENERIC'], {
        message: 'OptionType should be either GENERIC or COLOR',
    })
    @ApiProperty()
    optionType: string;
    
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    active: boolean;
}

export class SubCatOptCreateDto {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubCatOptCreateObj)
    options: SubCatOptCreateObj[];
}

export class SubCatOptUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty({ message: 'optionName should be non-empty' })
    optionName: string;
  
    @IsOptional()
    @IsArray({
      message: 'Available values for an option should be an array',
    })
    @ArrayNotEmpty({
      message: 'Available values for an option should be a non-emtpy array',
    })
    @IsString({
      each: true,
    })
    @ApiProperty()
    availableValues: string[];
  
    @IsOptional()
    @IsIn(['ADD','REPLACE'])
    @ApiProperty()
    addOrReplace: string;
  
    @IsOptional()
    @IsIn(['COLOR','GENERIC'], {
        message: 'OptionType should be either GENERIC or COLOR',
    })
    @ApiProperty()
    optionType: string;
  
    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    active: boolean;
  }
