"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("./guards/roles.guard");
const tenant_controller_1 = require("./tenant.controller");
const tenant_repository_1 = require("./tenant.repository");
const tenant_service_1 = require("./tenant.service");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, tenant_repository_1.TenantRepository, roles_guard_1.RolesGuard]
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map