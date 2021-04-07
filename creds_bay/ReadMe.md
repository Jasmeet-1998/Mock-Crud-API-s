#Creds Bay

By -> Jasmeet
Description -> Interview Task /Basics

#Major Packages Used

@hapi/joi -> For Validation

bcrypt -> For Encryption and Salting

body-parser -> For Parsing request Body

dotenv -> To store Secret/Sensitive Data in the local Environment.

express -> Server side logic

jsonwebtoken -> Token based Protected Routing

mongoose -> To Interact with MongoDB


#Routes


USE POSTMAN TO MAKE REQUESTS

UNPROTECTED ROUTE
----------------------------

'/credsBay/api/register/newUser' POST

Use Case-> TO ADD A NEW ADMIN OR AGENT OR CUSTOMER IN THE DATABASE.

Note -> This route is Unprotected and is used to populate the database.


Send raw data in body  as JSON object below
    {
      "name":"String",
      "email":"String",
      "password":"String"
      "usertype": "Agent" or "Admin" or "Customer"
    }

#Admin Routes (Protected)


1.)Admin Login POST Route

to View Everyone Details basically display Everything.

Note -> You must be Admin to Access this Route.

'credsBay/api/admin/login' POST

send raw data in body as JSON Object
{
    "email":"String",
    "password":"String"
}

Success(200)=> You will get a Long token with 1 hour validity use this token to make further admin request.

2.) Admin View GET Route

Requires - auth-token in request header.

'credsBay/api/admin/view' GET

In request header

set Content-Type : application/json
set auth-token   : token

token that was recieved when Admin hit the
previous Admin Login POST Route.

Success(200)=> Displays Everyone Details Including Admin , Customers & Agents as users Array JSON response.
