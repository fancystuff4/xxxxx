import { OrderDetailsDto } from "./orderDetails.dto";

export class OrderDetailsResponseDto {
    ok: boolean;
    order: OrderDetailsDto[];
}