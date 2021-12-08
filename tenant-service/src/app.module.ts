import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'passWORD321$',
      database: 'tenant_service',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TenantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
