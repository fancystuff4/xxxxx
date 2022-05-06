import {  IsNotEmpty,IsArray } from 'class-validator';

export class ServiceNameDto {
    @IsNotEmpty()
    serviceName: string;

}