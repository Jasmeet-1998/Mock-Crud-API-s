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

#Features and Access

1.) Admin can do anything (get,post,edit).

2.) Agent can access their own data and edit,update,get Customer Data.

3.) Customer can only get their own data.



#Routes


USE POSTMAN TO MAKE REQUESTS

UNPROTECTED ROUTE


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

To get auth-token for subsequent request.

Note -> You must be Admin to Access this Route.

'credsBay/api/admin/login' POST

send raw data in body as JSON Object
{
    "email":"String",
    "password":"String"
}

Success(200)=> You will get a Long token with 1 hour validity use this token to make further admin request.

2.) Admin View GET Route

to View Every User Details.

Requires - auth-token in request header.

'credsBay/api/admin/view' GET

In request header

set Content-Type : application/json
set auth-token   : token

token that was recieved when Admin hit the
previous Admin Login POST Route.

Success(200)=> Displays Everyone Details Including Admin , Customers & Agents as users Array JSON response.

3.) POST Login By Agent

'/credsBay/api/agent/login'

send raw data in body as JSON Object
{
    "email":"String",
    "password":"String"
}

Success(200)=> You will get a Long token with 1 hour validity use this token to make further agent requests.

4.)GET get all customer information

Requires - auth-token in request header.

'credsBay/api/agent/view' GET

In request header

set Content-Type : application/json
set auth-token   : token

token that was recieved when Agent hit the
previous Agent Login POST Route.

Success(200)=> Displays Customers details as customers Array JSON response.

5.)GET get agent_id by email passed as param in request url.

'credsBay/api/agent/view/EMAIL'

replace Email with agent email.

In request header

set Content-Type : application/json
set auth-token   : token

Success(200):gives agent_id associated to that email.

6.)POST Create a loan request

'/credsBay/api/agent/loan/new'

Access- Agent Only ,
 though , Admin have all the info regarding every user they can use the customer_id and agent_id to create a new loan request also.

 send raw data in body as JSON Object
{
     "customer_id":"String",
     "interest":Number,
     "agent_id":"String",
     "tenure":Number(in months)
}

NOTE->

customer_id and agent_id can be obtained by hitting the get all customer information and get agent_id by email routes.

Success(200):returns a {
  loan_req_id:"String"
}
