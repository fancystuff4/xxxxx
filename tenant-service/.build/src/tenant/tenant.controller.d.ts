import { CreateTenantDto, CreatePaymentDto } from './dto/createTenant.dto';
import { paginateTenantDto } from './dto/paginateTenant.dto';
import { updateTenantDto } from './dto/updateTenant.dto';
import { UpdateUserStatus } from './dto/updateUserStatus.dto';
import { GetTenantDto } from './dto/getTenant.dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private tenantService;
    constructor(tenantService: TenantService);
    getAllTenants(res: any, paginateTenantDto: paginateTenantDto): Promise<any>;
    createTenant(createTenantDto: CreateTenantDto, res: any): Promise<any>;
    getOne(getTenantDto: GetTenantDto, res: any): Promise<any>;
    updateTenant(tenant_id: string, updateTenantDto: updateTenantDto, res: any): Promise<any>;
    deleteTenant(tenant_id: string, res: any): Promise<any>;
    addPaymentService(tenant_id: string, createPaymentDto: CreatePaymentDto, res: any): Promise<any>;
    addPaymentCredentials(tenant_id: string, createPaymentDto: CreatePaymentDto, res: any): Promise<any>;
    removePaymentCredentials(tenant_id: string, payment_service: string, res: any): Promise<any>;
    getAllUsers(tenant_id: string, res: any): Promise<any>;
    getUserById(tenant_id: string, user_id: string, res: any): Promise<any>;
    updateUserStatus(tenant_id: string, user_id: string, updateUserStatus: UpdateUserStatus, res: any): Promise<any>;
    updateTenantStatus(tenant_id: string, updateUserStatus: UpdateUserStatus, res: any): Promise<any>;
}
