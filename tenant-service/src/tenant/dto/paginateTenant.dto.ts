import { IsOptional } from 'class-validator';

export class paginateTenantDto {
    @IsOptional()
    lastItem: string;
}
