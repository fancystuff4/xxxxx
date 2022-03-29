export enum DESKTOP_ROUTES {
    SIGN_UP = "desktop/signup",
    SIGN_IN = "desktop/signin",
    PROFILE = "desktop/profile",
    REFRESH = "desktop/refresh",
    LOGOUT = "desktop/logout",

    CART = "desktop/user/:userId/cart",
    CART_ADD = "desktop/cart",
    CART_REMOVE = "desktop/users/:userId/cart/:cartId/items/:lineItemId",
}

export enum MOBILE_ROUTES {
    SIGN_UP = "mobile/signup",
    SIGN_IN = "mobile/signin",
    PROFILE = "mobile/profile",
    REFRESH = "mobile/refresh",
    LOGOUT = "mobile/logout"
}