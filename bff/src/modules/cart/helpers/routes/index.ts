export enum DESKTOP_ROUTES {
  CART = 'desktop/cart',
  CART_ADD = 'desktop/cart',
  CART_ADD_ALL = 'desktop/cart/all',
  CART_REMOVE = 'desktop/cart/:cartId/items/:lineItemId',
  DELETE_CART = 'desktop/users/:userId/cart/:cartId',
}

export enum MOBILE_ROUTES {
  CART = 'mobile/cart',
  CART_ADD = 'mobile/cart',
  CART_ADD_ALL = 'mobile/cart/all',
  CART_REMOVE = 'mobile/cart/:cartId/items/:lineItemId',
  DELETE_CART = 'mobile/users/:userId/cart/:cartId',
}
