import { IsNotEmpty } from 'class-validator';

export class CartDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    variant: {
        variantID: string,
        title: string,
        itemID: string,
        price: number,
        options: [
            {
                name: string,
                type: number | string,
                value: number | string
            }
        ]
    }
}