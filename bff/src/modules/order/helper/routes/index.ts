export enum DESKTOP_ROUTES {
    CREATE_ORDER = 'desktop/customers/:customerId/orders',
    GET_ORDER_BY_ID = 'desktop/orders/:id',
    GET_ORDER_BY_CUSOTOMER_ID = 'desktop/customers/:customerId/orders',
    GET_ORDER_BY_ORDER_STATUS = 'desktop/orderStatus/:status/orders',
    GET_ALL_ORDERS = 'desktop/orders',
    GET_ORDER_BETWEEN_DATES = 'desktop/from/:from/to/:to/orders',
    GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID = 'desktop/from/:from/to/:to/customers/:customerId/orders',
    GET_ORDER_BY_DATE = 'desktop/date/:date/orders',
    GET_ORDER_BY_DATE_AND_CUSTOMER_ID = 'desktop/date/:date/customer/:customerId/orders',
}

export enum MOBILE_ROUTES {
    CREATE_ORDER = 'mobile/customers/:customerId/orders',
    GET_ORDER_BY_ID = 'mobile/orders/:id',
    GET_ORDER_BY_CUSOTOMER_ID = 'mobile/customers/:customerId/orders',
    GET_ORDER_BY_ORDER_STATUS = 'mobile/orderStatus/:status/orders',
    GET_ALL_ORDERS = 'mobile/orders',
    GET_ORDER_BETWEEN_DATES = 'mobile/from/:from/to/:to/orders',
    GET_ORDER_BETWEEN_DATES_AND_CUSTOMER_ID = 'mobile/from/:from/to/:to/customers/:customerId/orders',
    GET_ORDER_BY_DATE = 'mobile/date/:date/orders',
    GET_ORDER_BY_DATE_AND_CUSTOMER_ID = 'mobile/date/:date/customer/:customerId/orders',
}
}