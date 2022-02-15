import { IsNotEmpty } from 'class-validator';

export class GetTenantDto {
    @IsNotEmpty()
    tenantId: string;
}
