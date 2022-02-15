import { TenantRepository } from './tenant.repository';
export declare class TenantService {
    private tenantRepository;
    constructor(tenantRepository: TenantRepository);
    getAllTenant(paginateTenantDto: any): Promise<{
        ok: boolean;
        data: any;
        lastItem: any;
    }>;
    createTenant(data: any): Promise<{
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
    getTenantById(getTenantDto: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    updateTenant(tenant_id: string, data: any): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
    addPaymentCredentials(tenant_id: string, data: any): Promise<{
        ok: boolean;
        message: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        message?: undefined;
    }>;
    addPaymentService(tenant_id: string, data: any): Promise<{
        ok: boolean;
        data: any;
    }>;
    removePaymentCredentials(tenant_id: string, paymenService: string): Promise<{
        ok: boolean;
        data: any;
    }>;
    getAllUsers(tenant_id: string): Promise<{
        ok: boolean;
        data: any;
    }>;
    getUserById(tenant_id: string, user_id: string): Promise<{
        ok: boolean;
        data: any;
    }>;
    updateUserStatus(tenant_id: string, user_id: string, data: any): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
    updateTenantStatus(tenant_id: string, data: any): Promise<{
        ok: boolean;
        error: any;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        error?: undefined;
    }>;
    deleteTenant(tenant_id: string): Promise<{
        ok: boolean;
    }>;
}
