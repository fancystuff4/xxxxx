import { IsOptional } from 'class-validator';

export class PaginateTenantDto {
    @IsOptional()
    lastItem: string;
}
