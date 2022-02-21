
# ROUTES GUIDE

## OVERVIEW
This file describes how to use the endpoints exposed by the cart-service. This service is implemented for two main scenarios under which a user can add items to his/her cart; one is when the user is logged in and the other one is when the user is not logged in. There are other routes in the service as well, which are used in order to retrieve, update or delete cart items from a user's cart.

## ROUTES

For now, there are four routes in the service, three of which are restricted routes, i.e. in order to access these three routes, a user needs to be authenticated, and the other one works both as a public and restricted route, i.e. in order to access this route, the user need not be authenticated. Below are the details of the routes and their corresponding responses-

### 1. Add to Cart route: (both public as well as restricted route)

**Description:** When a logged in user hits this route with appropriate input, a new cart is created for that user and the item (as specified in the request body) gets added to this new cart, in case the user doesn't have a cart already. When the user has an existing cart, it is checked whether the item is already present in the cart. If it does, the item is updated inside the cart, and if it doesn't, the item simply gets inserted into the list of items inside the cart. When a non logged in user hits this route, an anonymous cart is created (with the help of browser cookie) with a random user id, and in order to add the item to this anonymous cart, the same previous cases have been considered and implemented. <br />
**Endpoint:** /addtocart <br />
**Method:** POST <br />
**Expected Input:** <br />
The route expects a JSON body in the API call with the following mandatory fields:
```
{
    "quantity": <number>,
    "variant": {
        "variantID": <string>,
        "title": <string>,
        "itemID": <string>,
        "price": <number>,
        "options": [
            {
                "name": <string>,
                "type": <number>,
                "value": <string> | <number>
            }
        ]
    }
}
```

For example: <br />
```
{
    "quantity": 1,
    "variant": {
        "variantID": "item1-variant2",
        "title": "Denim Jacket",
        "itemID": "item1",
        "price": 2500,
        "options": [
            {
                "name": "color",
                "type": 2,
                "value": "black"
            }
        ]
    }
}
```

**Expected response when the user is logged in:** <br />
*Response 1 (SUCCESS)*: When the logged in user doesn't have an existing cart, a new cart gets created for that user and the item gets inserted into the cart. The response object will contain the data of the newly created cart, with the status code 201. For example,
```
{
    "statusCode": 201,
    "message": "Add to Cart: A new cart has been created.",
    "data": {
        "id": "8c9ddf32-2cf0-46b6-b4c4-a883977cdf5c",
        "userID": "user-1",
        "createdAt": "Fri Feb 18 2022 11:58:57 GMT+0530 (India Standard Time)",
        "updatedAt": "Fri Feb 18 2022 11:58:57 GMT+0530 (India Standard Time)",
        "items": [
            {
                "lineItemID": "f4b27c17-1992-45c8-8ede-3572a7f8a66c",
                "itemDetails": {
                    "quantity": 2,
                    "variant": {
                        "variantID": "item1-variant5",
                        "title": "Denim Jacket",
                        "itemID": "item1",
                        "price": 2000,
                        "options": [
                            {
                                "name": "color",
                                "type": 5,
                                "value": "red"
                            }
                        ]
                    },
                    "totalPrice": 4000
                }
            }
        ]
    }
}
```
*Response 2 (ERROR)*: If error occurs for any reason in the scenario mentioned in Response 1, the request will be considered as a BAD REQUEST and response object will contain the following message with the status code 400.
```
{
    "statusCode": 400,
    "message": "Add to Cart: Error Trying to Create Cart"
}
```
*Response 3 (SUCCESS)*: When the logged in user has an existing cart and the item to be added is already present in the cart, the item inside the cart gets updated. The response object will contain the updated item, with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Add to Cart: An existing item has been modified.",
    "data": {
        "lineItemID": "f4b27c17-1992-45c8-8ede-3572a7f8a66c",
        "itemDetails": {
            "variant": {
                "options": [
                    {
                        "name": "color",
                        "type": 5,
                        "value": "red"
                    }
                ],
                "itemID": "item1",
                "variantID": "item1-variant5",
                "title": "Denim Jacket",
                "price": 2000
            },
            "totalPrice": 10000,
            "quantity": 5
        }
    }
}
```
*Response 4 (SUCCESS)*: When the logged in user has an existing cart but the item to be added is not present in the cart, then the item simply gets inserted into the list of items of the cart. The response object will contain the newly inserted item, with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Add to Cart: A new item has been added.",
    "data": {
        "lineItemID": "f402d7bb-d6de-42e9-bb51-49e7f2fd2b7a",
        "itemDetails": {
            "quantity": 1,
            "variant": {
                "variantID": "item2-variant1",
                "title": "Adidas Hoodie",
                "itemID": "item2",
                "price": 1200,
                "options": [
                    {
                        "name": "color",
                        "type": 1,
                        "value": "orange"
                    }
                ]
            },
            "totalPrice": 1200
        }
    }
}
```
*Response 5 (ERROR)*: If error occurs for any reason in the scenarios mentioned in Response 3 and 4, the request will be considered as a BAD REQUEST and the response object will contain the following message with the status code 400.
```
{
    "statusCode": 400,
    "message": "Add to Cart: Error Trying to Update Cart"
}
```
*Response 6 (ERROR)*: In case of any error on the server/backend, it will be considered as an internal server error and the response will contain the following message with the status code 500.
```
{
    "statusCode": 500,
    "message": "Add to Anonymous Cart: Error Trying to reach Database",
    "errors": {error-body}
}
```
**Expected response when the user is not logged in:** <br />
*Response 7 (SUCCESS)*: When the user tries to add an item to his cart for the first time without being logged in to the site, an anonymous cart gets created and the item gets inserted into the cart. A cookie, with the id of the newly created anonymous cart, is also saved into the browser in order to access the cart for future reference. Since this is just an anonymous cart, the user id will be a random unique string at first. When the actual mapping takes place between the anonymous cart and the user cart, the random user id string will be replaced by the actual id of the user. In this case, the response object will contain the data of the anonymous cart, with a status code 201. For example,
```
{
    "statusCode": 201,
    "message": "Add to Anonymous Cart: An anonymous cart has been created.",
    "data": {
        "id": "fede8571-de74-47b0-8b26-90176cf6c44e",
        "userID": "74ee0f6c-4241-43b2-8178-f1aa15cf13d3",
        "createdAt": "Fri Feb 18 2022 12:32:32 GMT+0530 (India Standard Time)",
        "updatedAt": "Fri Feb 18 2022 12:32:32 GMT+0530 (India Standard Time)",
        "items": [
            {
                "lineItemID": "3352848b-0e20-4ca5-85f7-7c1ca98089ac",
                "itemDetails": {
                    "quantity": 1,
                    "variant": {
                        "variantID": "item2-variant1",
                        "title": "Adidas Hoodie",
                        "itemID": "item2",
                        "price": 1200,
                        "options": [
                            {
                                "name": "color",
                                "type": 1,
                                "value": "black"
                            }
                        ]
                    },
                    "totalPrice": 1200
                }
            }
        ]
    }
}
``` 
*Response 8 (ERROR)*: If error occurs for any reason in the scenario mentioned in Response 6, the request will be considered as a BAD REQUEST and response object will contain the following message with the status code 400.
```
{
    "statusCode": 400,
    "message": "Add to Anonymous Cart: Error Trying to Create Anonymous Cart"
}
```
*Response 9 (SUCCESS)*: When the same user tries to add another item into his cart from the same browser, without being logged in to the site, first the anonymous cart is retrieved from the cart id saved in the browser cookie. If the item to be added already exists in the cart, the item inside the anonymous cart gets updated. The response will contain the updated item, with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Add to Anonymous Cart: An existing item has been modified.",
    "data": {
        "lineItemID": "3352848b-0e20-4ca5-85f7-7c1ca98089ac",
        "itemDetails": {
            "variant": {
                "options": [
                    {
                        "name": "color",
                        "type": 1,
                        "value": "black"
                    }
                ],
                "itemID": "item2",
                "variantID": "item2-variant1",
                "title": "Adidas Hoodie",
                "price": 1200
            },
            "totalPrice": 2400,
            "quantity": 2
        }
    }
}
```
*Response 10 (SUCCESS)*: Again when the same user tries to add another item into his cart from the same browser, without being logged in to the site, the anonymous cart is again retrieved from the cart id saved in the browser cookie. Now, if the item to be added doesn't exist in the cart, the item gets inserted into the list of items of the anonymous cart. The response will contain the newly inserted item, with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Add to Anonymous Cart: A new item has been added.",
    "data": {
        "lineItemID": "d75a7eca-fc45-4050-a739-538546573de5",
        "itemDetails": {
            "quantity": 1,
            "variant": {
                "variantID": "item2-variant3",
                "title": "Adidas Hoodie",
                "itemID": "item2",
                "price": 1400,
                "options": [
                    {
                        "name": "color",
                        "type": 3,
                        "value": "olive"
                    }
                ]
            },
            "totalPrice": 1400
        }
    }
}
```
*Response 11 (ERROR)*: If error occurs for any reason in the scenarios mentioned in Response 9 and 10, the request will be considered as a BAD REQUEST and the response object will contain the following message with the status code 400.
```
{
    "statusCode": 400,
    "message": "Add to Anonymous Cart: Error Trying to Update Anonymous Cart"
}
```
*Response 12 (ERROR)*: In case of any error on the server/backend, it will be considered as an internal server error and the response will contain the following message with the status code 500.
```
{
    "statusCode": 500,
    "message": "Add to Anonymous Cart: Error Trying to reach Database",
    "errors": {error-body}
}
```

### 2. Get Cart Details by User Id: (restricted route)

**Description:** When a logged in user makes a request to this route, it is checked whether there exists a cart in the database for this particular user. If a cart exists, it is returned to the user. <br />
**Endpoint:** /users/:userID/cart <br />
**Method:** GET <br />
**Expected Route Parameter:**
```
"userID": <string>
```
**Expected Response:** <br />
*Response 1 (SUCCESS)*: When the logged in user has a cart in the database, the response will contain their cart details, with 200 status code. For example,
```
{
    "statusCode": 200,
    "cart": {
        "createdAt": "Fri Feb 18 2022 18:35:07 GMT+0530 (India Standard Time)",
        "id": "a1e4b3b3-2c6e-42aa-9252-7113dfcfd980",
        "items": [
            {
                "lineItemID": "13c399d9-58b0-4943-91ec-54f21d6f51c9",
                "itemDetails": {
                    "variant": {
                        "options": [
                            {
                                "name": "color",
                                "type": 3,
                                "value": "olive"
                            }
                        ],
                        "itemID": "item2",
                        "variantID": "item2-variant3",
                        "title": "Adidas Hoodie",
                        "price": 1400
                    },
                    "totalPrice": 2800,
                    "quantity": 2
                }
            },
            {
                "lineItemID": "f402d7bb-d6de-42e9-bb51-49e7f2fd2b7a",
                "itemDetails": {
                    "variant": {
                        "options": [
                            {
                                "name": "color",
                                "type": 1,
                                "value": "orange"
                            }
                        ],
                        "itemID": "item2",
                        "variantID": "item2-variant1",
                        "title": "Adidas Hoodie",
                        "price": 1200
                    },
                    "totalPrice": 2400,
                    "quantity": 2
                }
            }
        ],
        "userID": "user-2",
        "updatedAt": "Fri Feb 18 2022 18:37:35 GMT+0530 (India Standard Time)"
    }
}
```
*Response 2 (SUCCESS)*: When the logged in user doesn't have a cart in the database, the response will contain the following message with 200 status code.
```
{
    "statusCode": 200,
    "message": "Get User Cart: The user with id 'user-1' has no existing cart"
}
```
*Response 3 (ERROR)*: In case of any error on the server/backend, it will be considered as an internal server error and the response will contain the following message with the status code 500.
```
{
    "statusCode": 500,
    "message": "Get User Cart: Error Trying to reach Database",
    "errors": {error-body}
}
```

### 3. Update Item in User Cart: (restricted route)

**Description:** When a logged in user hits this route, first it is checked whether the user has an existing cart in the database. If he/she has a cart, then further it is checked whether the item to be modified exists in the cart. If it does, the item simply gets updated inside the cart. <br />
**Endpoint:** /users/:userID/cart/:cartID/items/:lineItemID <br />
**Method:** PATCH <br />
**Expected Route Parameters:**
```
"userID": <string>,
"cartID": <string>,
"lineItemID": <string>
``` 
**Expected Input:**
```
{
    "quantity": <number>
}
```
**Expected Response:** <br />
*Response 1 (SUCCESS)*: When the logged in user has an existing cart in the database and he/she tries to update one of the items in his cart by specifying a valid quantity, then the quanity and the total price of that particular item inside the cart gets updated. The response will contain the updated item with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Update Cart: an existing item has been modified.",
    "data": {
        "lineItemID": "13c399d9-58b0-4943-91ec-54f21d6f51c9",
        "itemDetails": {
            "variant": {
                "options": [
                    {
                        "name": "color",
                        "type": 3,
                        "value": "olive"
                    }
                ],
                "itemID": "item2",
                "variantID": "item2-variant3",
                "title": "Adidas Hoodie",
                "price": 1400
            },
            "totalPrice": 2800,
            "quantity": 2
        }
    }
}
```
*Response 2 (ERROR)*: When the logged in user has an existing cart, but he/she tries to update an item that doesn't exist in the user's cart, such a request will be considered as a BAD REQUEST and the response will contain the following message with 400 status code.
```
{
    "statusCode": 400,
    "message": "Update Cart: the item doesn't exist in user's cart"
}
```
*Response 3 (ERROR)*: When there is a mismatch in the logged in user's actual cart id and the cart id specified in the request parameter, such a request will also be considered as a BAD REQUEST. The response will contain the following message with 400 status code.
```
{
    "statusCode": 400,
    "message": "Update Cart: The user with id 'user-1' has no existing cart with id 'a1e4b3b3-2c6e-42aa-9252-7113dfcfd980'"
}
```

*Reponse 4 (ERROR)*: When the logged in user doesn't specify the quantity or when there's a type mismatch of the quantity attribute, such a request will also be considered as a BAD REQUEST. The response will contain the following message with 400 status code.
```
{
    "statusCode": 400,
    "message": "Update Cart: Please specify the quantity of the item correctly"
}
```
*Response 5 (ERROR)*: In case of any error on the server/backend, it will be considered as an internal server error and the response will contain the following message with the status code 500.
```
{
    "statusCode": 500,
    "message": "Update Cart: Error Trying to reach Database",
    "errors": {error-body}
}
```
### 4. Remove Item from User Cart: (restricted route)

**Description:** When a logged in user hits this route, first it is checked whether the user has an existing cart in the database. If he/she has a cart, then further it is checked whether the item to be remove exists in the cart. If it does, the item simply gets removed from the cart. If the item being removed is the last item in the user's cart, then the entire cart gets removed from the database after removal of the item. <br />
**Endpoint:** /users/:userID/cart/:cartID/items/:lineItemID <br />
**Method:** DELETE <br />
**Expected Route Parameters:**
```
"userID": <string>,
"cartID": <string>,
"lineItemID": <string>
```
**Expected Response:** <br />
*Response 1 (SUCCESS)*: When the logged in user has an existing cart in the database and he/she tries to remove one of the existing items from his/her cart, then that particular item simply gets remove from inside the user's cart. The response will contain the removed item with the status code 200. For example,
```
{
    "statusCode": 200,
    "message": "Remove Item from Cart: An existing item has been removed from user's cart.",
    "data": {
        "lineItemID": "46768098-eea2-4358-b316-c854994e9aaf",
        "itemDetails": {
            "variant": {
                "options": [
                    {
                        "name": "color",
                        "type": 3,
                        "value": "olive"
                    }
                ],
                "itemID": "item2",
                "variantID": "item2-variant3",
                "title": "Adidas Hoodie",
                "price": 1400
            },
            "totalPrice": 1400,
            "quantity": 1
        }
    }
}
```
*Response 2 (ERROR)*: When the logged in user has an existing cart, but he/she tries to rempve an item that doesn't exist in the user's cart, such a request will be considered as a BAD REQUEST and the response will contain the following message with 400 status code.
```
{
    "statusCode": 400,
    "message": "Remove Item from Cart: The item doesn't exist in user's cart."
}
```
*Response 3 (ERROR)*: When there is a mismatch in the logged in user's actual cart id and the cart id specified in the request parameter, such a request will also be considered as a BAD REQUEST. The response will contain the following message with 400 status code.
```
{
    "statusCode": 400,
    "message": "Remove Item from Cart: The user with id 'user-1' has no existing cart with id 'a1e4b3b3-2c6e-42aa-9252-7113dfcfd980'"
}
```
*Response 4 (ERROR)*: In case of any error on the server/backend, it will be considered as an internal server error and the response will contain the following message with the status code 500.
```
{
    "statusCode": 500,
    "message": "Remove Item from Cart: Error Trying to reach Database",
    "errors": {error-body}
}
```
