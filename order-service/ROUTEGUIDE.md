# ROUTES GUIDE

<br/>

## OVERVIEW

This file describes how to use the endpoints exposed by the order-service. This service handles various requests related to orders.

<br />

## ROUTES

1. Create Order Route :  
        This route creates a new order in the database.


    **Endpoint**: &nbsp;/orders/customer/<customer_id>
    **Method**:&nbsp; POST  
    **Expected Inputs**:  
        The route expects a json body in the API call with the following mandatory fields.
```JSON
        {
            "productDetails": {
                "id": <Valid product_id as string>,
                "title": <Product Title as string>,
                "category": <Product category as a string>,
                "price": <Price of the product as a number>
            },    
            "quantity": <Quantity of the product ordered as a number>,
            "paymentStatus": <Valid Payment Status as string>,
            "orderStatus": <Valid Order Status as string>
        }
``` 

- Valid Payment Status can be 'success' or 'failed'.
- Valid Order Status can be 'placed' or 'outForDelivery' or 'delivered'.

Apart from these mandatory fields in productDetails, any other property can be included in the productDetails, eg.
```JSON
        {
            "id": "27edd86c-4045-451f-9181-e65d8e38ce31", 
            "title": "winter",
            "category": "Socks",
            "price": 80,
            "length": 12,
            "material": "cotton"
        }  
```
**Expected response**:   
- On success: On successful creation of the order, the response object will contain *ok* whose value is true and a *order* object, which is the newly created order. Example,
```JSON
        {
            "ok": true,
            "order": {
                "id": "27edd86c-4045-451f-9181-e65d8e38ce31",
                "customerId": "1234",
                "orderDate": 1645167316668,
                "productDetails": {
                    "id": "aaa3a41c-46a6-4601-8fc4-79f60fa74986",
                    "title": "winter",
                    "category": "Socks",
                    "price": 80
                },
                "quantity": 3,
                "paymentStatus": "success",
                "orderStatus": "outForDelivery"
            }
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

2. Get all Orders Route :  
        This route fetches all the orders in the database.


    **Endpoint**: &nbsp;/orders
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route does not expects any inputs.

**Expected response**:   
- On success: On successful, the response object will contain *ok* whose value is true and a *order* array, which containes all the orders. Example,
```JSON
        {
            "ok": true,
            "orders": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

3. Get Order by Order ID Route :  
        This route fetch an order with requested *order ID* from the database.


    **Endpoint**: &nbsp;/orders/<order_id>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects *order_id* as a url parameter.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": {
                "quantity": 2,
                "customerId": "1234",
                "orderStatus": "outForDelivery",
                "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                "productDetails": {
                    "title": "summer",
                    "category": "Socks",
                    "price": 50
                },
                "orderDate": 1645424607171,
                "paymentStatus": "success"
            }
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

4. Get Order by Customer ID Route :  
        This route fetches orders with requested *customer ID* from the database.


    **Endpoint**: &nbsp;/orders/customer/<customer_id>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects *customer_id* as a url parameter.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

5. Get Order by Order Status Route :  
        This route fetches orders with requested valid *Order Status* from the database.


    **Endpoint**: &nbsp;/orders/orderStatus/<order_status>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects a valid *order_status* as a url parameter.
        - Valid Order Status can be 'placed' or 'outForDelivery' or 'delivered'.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

6. Get Order by Date Route :  
        This route fetches orders with requested valid *date* from the database.


    **Endpoint**: &nbsp;/orders/date/<date>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects a valid *date* as a url parameter.
        - Valid date is of format *YYYY-MM-DD*.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

7. Get Order by Date and Customer Id Route :  
        This route fetches orders with requested valid *date* and *customer_id* from the database.


    **Endpoint**: &nbsp;/orders/date/<date>/customer/<customer_id>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects a valid *date* and *customer_id* as a url parameters.
        - Valid date is of format *YYYY-MM-DD*.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

8. Get Order by Date Range Route :  
        This route fetches orders between *start_date* and *end_date* from the database.


    **Endpoint**: &nbsp;/orders/date/from/<start_date>/to/<end_date>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects a valid *start_date* and *end_date* as a url parameter.
        - Valid start_date and end_date is of format *YYYY-MM-DD*.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

9. Get Order by Date Range and Customer Id Route :  
        This route fetches orders between *start_date* and *end_date* with the requested *customer_id* from the database.


    **Endpoint**: &nbsp;/orders/date/from/<start_date>/to/<end_date>/customer/<customer_id>
    **Method**:&nbsp; GET  
    **Expected Inputs**:  
        The route expects valid *start_date* , *end_date* and *customer_id* as a url parameters.
        - Valid start_date and end_date is of format *YYYY-MM-DD*.

**Expected response**:   
- On success: On successful api call, the response object will contain *ok* whose value is true and the required *order* object. Example,
```JSON
        {
            "ok": true,
            "order": [
                {
                    "quantity": 3,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                    "productDetails": {
                        "title": "winter",
                        "category": "Socks",
                        "price": 80
                    },
                    "orderDate": 1645424587673,
                    "paymentStatus": "success"
                },
                {
                    "quantity": 2,
                    "customerId": "1234",
                    "orderStatus": "outForDelivery",
                    "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                    "productDetails": {
                        "title": "summer",
                        "category": "Socks",
                        "price": 50
                    },
                    "orderDate": 1645424607171,
                    "paymentStatus": "success"
                }
            ]
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

10. Update Order Route :  
        This route updates an existing order in the database.


    **Endpoint**: &nbsp;/orders/<order_id>
    **Method**:&nbsp; PUT  
    **Expected Inputs**:  
        The route expects a json body in the API call with the following mandatory fields.
```JSON
        {
            "paymentStatus": <Valid Payment Status as string>,
            "orderStatus": <Valid Order Status as string>
        }
``` 

- Valid Payment Status can be 'success' or 'failed'.
- Valid Order Status can be 'placed' or 'outForDelivery' or 'delivered'.

**Expected response**:   
- On success: On successful updation of the order, the response object will contain *ok* whose value is true and a *order* object, which is the updated order. Example,
```JSON
        {
            "ok": true,
            "order": {
                "quantity": 2,
                "customerId": "1234",
                "orderStatus": "out for delivery",
                "id": "844dd1c6-3e56-4f04-840f-0123b460bfa0",
                "productDetails": {
                    "title": "summer",
                    "category": "Socks",
                    "price": 50
                },
                "orderDate": 1645424607171,
                "paymentStatus": "failed"
            }
        }
```
- On Incorrect Order Id : On providing incorrect order_id, the response object will contain *ok* whose value is false and a *message* with value 'Order with order Id <provided order_id> not found'. Example,
````JSON
        {
            "ok": false,
            "message": "Order with order Id 844dd1c6-3e56-4f04-840f-0123b460bfa1 not found"
        }
````
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```

10. Delete Order Route :  
        This route detetes an existing order with the provided *order_id* in the database.


    **Endpoint**: &nbsp;/orders/<order_id>
    **Method**:&nbsp; DELETE  
    **Expected Inputs**:  
        The route expects *order_id* as a url parameter.

**Expected response**:   
- On success: On successful deletion of the order, the response object will contain *ok* whose value is true and a *order* object, which is the updated order. Example,
```JSON
        {
            "ok": true,
            "data": {
                "quantity": 3,
                "customerId": "1234",
                "orderStatus": "outForDelivery",
                "id": "8d506031-b12f-43a0-a554-eedf00a7276f",
                "productDetails": {
                    "title": "winter",
                    "category": "Socks",
                    "price": 80
                },
                "orderDate": 1645424587673,
                "paymentStatus": "success"
            }
        }
```
- On Incorrect Order Id : On providing incorrect order_id, the response object will contain *ok* whose value is false and a *message* with value 'Order with order Id <provided order_id> not found'. Example,
````JSON
        {
            "ok": false,
            "message": "Order with order Id 844dd1c6-3e56-4f04-840f-0123b460bfa1 not found"
        }
````
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *ok* as false, a *message* which will contain the error as a string values and a *error* string describing the type of error. For example, following is an error response when there is an error while connecting to database.

```JSON
        {
            "ok": false,
            "message": "Error Trying to reach DB",
            "errors": "Internal Server Error",
        }
```














 