import { HttpService } from '@nestjs/axios';
import { InvokeAPI } from '../../common/methods/invokeAPI';

export class TenantService {
    
    async getAllTenants(lastItem) {
        const result :  any = await InvokeAPI(`/dev/tenants/all?lastItem=${lastItem}`, 'get', undefined, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }

    async getTenant(tenantId) {  
        const result :  any = await InvokeAPI(`/dev/tenants/${tenantId}`, 'get', undefined, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }


    async deleteTenant(tenantId) {  
        const result :  any = await InvokeAPI(`/dev/tenants/${tenantId}`, 'delete', undefined, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }

    async createTenant(data) {  
       return  await InvokeAPI(`/dev/tenants`, 'post', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
    
    }

    async updateTenantStatus(tenantId,data) {  
        const result :  any = await InvokeAPI(`/dev/tenants/${tenantId}/status`, 'put', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }


    async updateTenant(tenantId,data) {  
        const result :  any = await InvokeAPI(`/dev/tenants/${tenantId}`, 'put', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }

    async addPaymentService(superAdminId,data) {  
        const result :  any = await InvokeAPI(`/dev/superadmin/${superAdminId}/payments`, 'post', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }

    async editPaymentService(superAdminId,serviceName,data) {  
        const result :  any = await InvokeAPI(`/dev/superadmin/${superAdminId}/payments/${serviceName}`, 'put', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }
    async addTenantPaymentCredentials(superAdminId,tenantId,data) {  
        const result :  any = await InvokeAPI(`/dev/superadmin/${superAdminId}/tenant/${tenantId}/payments`, 'post', data, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }
    async removeTenantPaymentCredentials(tenantId,serviceName) {  
        const result :  any = await InvokeAPI(`/dev/tenants/${tenantId}/payments/${serviceName}`, 'delete', undefined, undefined, Number(process.env.TENANT_SERVICE_PORT));
        return result;
    }

      
    
    
}
