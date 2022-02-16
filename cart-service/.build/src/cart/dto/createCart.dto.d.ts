export declare class CartDto {
    quantity: number;
    variant: {
        variantID: string;
        title: string;
        itemID: string;
        price: number;
        options: [
            {
                name: string;
                type: number | string;
                value: number | string;
            }
        ];
    };
}
