import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderDateController } from './orderDate.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderDateController,OrderController],
  providers: [OrderService, OrderRepository]
})
export class OrderModule {}
