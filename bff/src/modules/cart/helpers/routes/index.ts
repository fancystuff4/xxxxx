export enum DESKTOP_ROUTES {
    CART = "desktop/user/:userId/cart",
    CART_ADD = "desktop/cart",
    CART_REMOVE = "desktop/users/:userId/cart/:cartId/items/:lineItemId",
}

export enum MOBILE_ROUTES {
    CART = "mobile/user/:userId/cart",
    CART_ADD = "mobile/cart",
    CART_REMOVE = "mobile/users/:userId/cart/:cartId/items/:lineItemId",
}