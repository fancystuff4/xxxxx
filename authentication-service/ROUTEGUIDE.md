# ROUTES GUIDE

<br/>

## OVERVIEW

This file describes how to use the endpoints exposed by the authentication-service. The service assumes that three types of user roles can exist in the system, viz. Super-Admin, Tenant and User. Tenants represent the business owners and the Users are the individual buyers who will signup for the services of the Tenants. The Super-Admin has the full control over the system. Some of the API may require different inputs for different user roles.

<br />

## ROUTES

There are two types of routes in this service- public routes and restricted routes. As the name suggests, the public routes do not need the API caller to be authenticated beforehand. Whereas, the restricted routes need the caller to be authenticated. To ensure that a user is authenticated, the private routes expect an *access_token* as the *Bearer token* in the 'Authorization' header of the API call. Follow the route guides to know how to obtain the tokens.

### PUBLIC ROUTES
1. Signup Route :  
         This route creates a new user in the database.


    **Endpoint**: &nbsp;/auth/local/signup  
    **Method**:&nbsp; POST  
    **Expected Inputs**:  
        The route expects a json body in the API call with the following mandatory fields irrespective of the user role  
```JSON
            {  
                 "username": <email_id>,  
                 "password": <password string>,  
                 "role": <a valid role mentioned above>,  
            }
```  
If the user role is 'User', then 'tenantId' field will also be mandatory.
```JSON
            {  
                 "username": <email_id>,  
                 "password": <password string>,  
                 "role": <a valid role mentioned above>,
                 "tenantId": <a valid tenant Id>,  
            }
``` 
Apart from these mandatory fields, any other property can be included in the json body to store, eg.
```JSON
            {
                "username": "tenant1@gmail.com",
                "password": "tenant1",
                "role": "Tenant",
                "firstName": "Belluci",
                "businessType": "Clothing"
            }   
```
**Expected response**:   
- On success: On successful creation of the user, the response object will contain a 201 *statusCode* and a *data* object, which is the newly created user. Example,
```JSON
        {
            "statusCode": 201,
            "data": {
                "firstName": "Belluci",
                "role": "Tenant",
                "roleGSIPK": "Tenant",
                "tenantId": "e67e98b9",
                "SK": "tenant-details",
                "roleGSISK": "tenantId-e67e98b9-username-username",
                "businessType": "Clothing",
                "username": "tenant1@gmail.com"
            }
        }
```
- On Error: Error may occur due to various reasons including missing required parameters, unexpected parameter values, internal server error etc. The error response object will contain a *statusCode*, a *message* array which will contain the errors as string values and a *error* string describing the type of error. For example, following is an error response for trying to create a *Tenant* user with an existing *username*.
```JSON
        {
            "statusCode": 400,
            "message": [
                "This Tenant is already present"
            ],
            "error": "Bad Request"
        }
```

2. SignIn route:  
    This route verifies a user sign-in request and on successfull verification, sends an *access_token* and a *refresh_token* in the response body as well as cookies.
    The *access_token* should be sent in the 'Authorization' header of subsequent requests for authorizing restricted routes. The *refresh_token* has a longer validity than the *access_token*. If the *access_token* is expired, *refresh_token* should be sent in the 'Authorization' header to obtain a new set of valid tokens.

    **Endpoint**: &nbsp; /auth/local/signin  
    **Method**: &nbsp; POST  
    **Expected Inputs**:  
        Just like the signup route, the signin route also has three mandatory fields that needs to be sent in the request body- *username*, *password* and *role*.
        In case of *User* type login, *tenantId* field is also mandatory.

```JSON
        {
            "username": <username email>,
            "password": <password string>,
            "role": <user type of the logger>,
            "tenantId": <mandatory for 'User' role>
        }
```

**Expected response**:
- On success:  
If the login is successful, the response object sends a *statusCode* of 200 and a *data* object with *access_token* and *refresh_token* inside it. The response also sets two cookies- *access_token* and *refresh_token* which can be used as 'Authorization' headers for authorization or obtaining a new set of valid tokens respectively. Example,

```JSON
        {
            "statusCode": 200,
            "data": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwidGVuYW50SWQiOiJkMGEwZTlmNyIsImlhdCI6MTY0MzExMzY2MCwiZXhwIjoxNjQzMTEzNzIwfQ.I2a1KdZpDfXvXBxVch86Fv1tfTJsdF6d1csmnlgZi84",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwidGVuYW50SWQiOiJkMGEwZTlmNyIsImlhdCI6MTY0MzExMzY2MCwiZXhwIjoxNjQzMTE0MjYwfQ.KyES1sA7Ns8Cc1Nc6CsKGla2v5Ag-o1QFWVjFG8WJYI"
            }
        }
```

- On failure: 
If the login is not successful due to server error or a bad request, a proper *statusCode* is send in the response. The response object also contains *message* array, which contains the description of all the errors as string values. The *error* field gives a short description about the type of error. Following is an example of an error for wrong password.

```JSON
        {
            "statusCode": 400,
            "message": [
                "Password is wrong"
            ],
            "error": "Bad Request"
        }
```

3. Get refresh token: 
    This route should be used to fetch a new pair of *access_token* and *refresh_token* after the existing *access_token* expires.

    **Endpoint**: &nbsp; /auth/refresh  
    **Method**: &nbsp; POST  
    **Expected Inputs**:  
        The 'Authorization' header should contain the *refresh_token* as the *Bearer token* as follows:

```JSON
    {
        // other headers
        ...,
        "Authorization": "Bearer <refresh_token_value>",
        ...
    }
```

**Expected response**:
- On success:
    The success response is similar to that of the sign-in route. The response object in this case will have a 200 *statusCode* and the *data* object will have the new pair of *access_token* and the *refresh_token*. The tokens will also be set as cookies with the same name.
    Example of success response-

```JSON
        {
            "statusCode": 200,
            "data": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwidGVuYW50SWQiOiJkMGEwZTlmNyIsImlhdCI6MTY0MzExNTU2NywiZXhwIjoxNjQzMTE1NjI3fQ.Y-aJrsltSKsPGouiXrKA1Cyx8OTccYwc9b-_mmnYj4Y",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwidGVuYW50SWQiOiJkMGEwZTlmNyIsImlhdCI6MTY0MzExNTU2NywiZXhwIjoxNjQzMTE2MTY3fQ.vsLVQ6T0cU2L-s8Mi_7xn1cdfe6VMRcA01nw0lCq-yM"
            }
        }
```

- On failure:
    If the API fails (eg, due to expired *refresh_token*), then the failure response will have an appropriate *statusCode* and a *message* array describing the errors as strings. Following is the response of an invalid(tempered *refresh_token*).

```JSON
    {
    "statusCode": 400,
    "message": [
        "invalid token"
    ],
    "error": "Bad Request"
}
```

### RESTRICTED ROUTES:
The following routes expect an *access_token* as the *Bearer token* in the 'Authorization' header of the API call. The user needs to signin to obtain the token.

1. Logout:
    This route will logout the currently logged in user.

    **Endpoint**: &nbsp; /auth/logout  
    **Method**: &nbsp; POST  
    **Expected Inputs**:  
        The only required input is a valid *access_token* in the header of the API call.

```JSON
    {
        // other headers
        ...,
        "Authorization": "Bearer <access_token_value>",
        ...
    }
```
**Expected response**: 
- On success:  
On successful logout, the response object will contain the *statusCode* 200.

```JSON
        {
            "statusCode": 200
        }
```

- On failure: 
    If the logout fails due to any reason (eg. expired access_token), then the response will have a proper *statusCode* and a *message* array describing the errors as string values.
    Example,

```JSON
        {
            "statusCode": 400,
            "message": [
                "jwt expired"
            ],
            "error": "Bad Request"
        }
```

2. Get user profile:  

    This route returns the profile of the user.  

    **Endpoint**: &nbsp; /auth/profile  
    **Method**: &nbsp; GET  
    **Expected Input**:  
        The only required input is a valid *access_token* in the header of the API call.

```JSON
    {
        // other headers
        ...,
        "Authorization": "Bearer <access_token_value>",
        ...
    }
```

**Expected response**:  
- On success:  
If the API call is successful, the response object will have the *statusCode* 200 and the *data* object will have the profile details of the user. Example-

```JSON
        {
            "statusCode": 200,
            "data": {
                "firstName": "Monica",
                "role": "User",
                "roleGSIPK": "User",
                "tenantId": "d0a0e9f7",
                "SK": "d0a0e9f7",
                "roleGSISK": "tenantId-d0a0e9f7-username-user1@gmail.com",
                "username": "user1@gmail.com"
            }
        }
```

- On failure:
If the API fails due to some reason, the response object will give an appropriate *statusCode*, a *message* array with the error descriptions as strings and an *error* string with the type of error. For example, the following is an error response while sending an expired *access_token* in the 'Authorization' header.

```JSON
        {
            "statusCode": 400,
            "message": [
                "jwt expired"
            ],
            "error": "Bad Request"
        }
```








 