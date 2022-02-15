import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantController } from './tenant.controller';
import { TenantRepository } from './tenant.repository';
// import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Module({
  imports: [],
  controllers: [TenantController],
  providers: [TenantService,TenantRepository,RolesGuard]
})
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Tenant])
//   ],
//   controllers: [TenantController],
//   providers: [TenantService]
// })
export class TenantModule {}
