import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  paymentStatus: 'success' | 'failed';

  @IsNotEmpty()
  orderStatus: 'placed' | 'outForDelivery' | 'delivered';
}
