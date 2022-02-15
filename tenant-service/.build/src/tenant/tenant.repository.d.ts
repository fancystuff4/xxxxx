import { CreateTenantDto } from './dto/createTenant.dto';
import { updateTenantDto } from './dto/updateTenant.dto';
import { GetTenantDto } from './dto/getTenant.dto';
export declare class TenantRepository {
    constructor();
    createTenant(CreateTenantDto: CreateTenantDto): Promise<{
        ok: boolean;
        data: {
            PK: string;
            SK: string;
            fullname: string;
            username: string;
            password: string;
            address: {
                city: string;
                state: string;
                country: string;
                pin: string;
            };
            status: boolean;
            paymentdata: {};
            role: string;
        };
    }>;
    getTenantById(getTenantDto: GetTenantDto): Promise<{
        ok: boolean;
        data: any;
    }>;
    getTenants(paginateTenantDto: any): Promise<{
        ok: boolean;
        data: any;
        lastItem: any;
    }>;
    updateTenant(tenant_id: any, updateTenantDto: updateTenantDto): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
    updateTenantStatus(tenant_id: any, data: any): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
    deleteTenant(tenant_id: any): Promise<{
        ok: boolean;
    }>;
    addPaymentCredentials(tenant_id: any, data: any): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        message?: undefined;
    }>;
    addPaymentService(tenant_id: any, data: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    removePaymentCredentials(tenant_id: any, paymentService: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    getUsers(tenant_id: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    getUserById(tenant_id: string, user_id: string): Promise<{
        ok: boolean;
        data: any;
    }>;
    updateUserStatus(tenant_id: any, user_id: any, data: any): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
}
