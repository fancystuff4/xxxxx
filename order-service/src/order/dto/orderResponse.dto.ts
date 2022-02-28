import { OrderDetailsDto } from "./orderDetails.dto";

export class OrderResponseDto {
    ok: boolean;
    order: OrderDetailsDto;
}