Creds Bay
------------------



By -> Jasmeet
Description -> Interview Task /Basics

Major Packages Used
-------------------

@hapi/joi -> For Validation

bcrypt -> For Encryption and Salting

body-parser -> For Parsing request Body

dotenv -> To store Secret/Sensitive Data in the local Environment.

express -> Server side logic

jsonwebtoken -> Token based Protected Routing

mongoose -> To Interact with MongoDB

mocha & chai -> For testing.

Features and Access
---------------

1.) Admin can fetch anyone Information basically all Users in the DATABASE
 and Approve Loans(get,Approve).

2.) Agent can access their own data and edit,update,get Customer Data.

3.) Customer can only get their own Loan Requests.

NOTE-> Admin can Use Agent Creds to Edit Loan Request this is Not missed by me
I have a Route for Admin to Get Information for all users for Debugging PURPOSES
By removing the Route in the admin.js of routes directory this loophole can be tackled.

#Docker & How to Make it Work !
-------------
To make the API work and Run Test Cases type the below commands after Cloning this Repo.
Also Create a .env File in the creds_bay root level to access the mongoDB Database.
this file will have two Environment variables.
 
DB_CONNECT="mongoUrl"
TOKEN_SECRET="Anything Random or Your Secret Cipher You want to add"

-docker build -t jasmeetbali/interview-assignment-redcarpetup .

-docker run -it -p 8080:3000 jasmeetbali/interview-assignment-redcarpetup

-open a new terminal and Run npm test


#Routes
------------


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
----------------------------

To get auth-token for subsequent request.

Note -> You must be Admin to Access this Route.

'credsBay/api/admin/login' POST

send raw data in body as JSON Object
{
    "email":"String",
    "password":"String"
}

Success(200)=> You will get a Long token with 1 hour validity use this token to make further admin request.

2.) Admin View GET Route (THIS IS JUST A TESTING ROUTE CAN BE REMOVED IN THE FINAL PRODUCTION VERSION TO PREVENT ADMIN TO USE AGENT CREDENTIALS TO EDIT LOAN REQUEST.)
---------------------------------------------------------------------

Admin Only

to List All Users Data in the Database.

Requires - auth-token in request header and admin_id in request params.

'credsBay/api/admin/view/admin_id' GET

replace admin_id by the admin_id that was received when new Admin was added to the database via the unprotected register route.

In request header

set Content-Type : application/json
set auth-token   : token

token that was recieved when Admin hit the
previous Admin Login POST Route.

Success(200)=> Displays Everyone Details Including Admin , Customers & Agents as users Array JSON response.

3.) POST Login By Agent
----------------------------------------------
'/credsBay/api/agent/login'

send raw data in body as JSON Object
{
    "email":"String",
    "password":"String"
}

Success(200)=> You will get a Long token with 1 hour validity use this token to make further agent requests.

4.)GET get all customer information
------------------------------------------------
Requires - auth-token in request header.

'credsBay/api/agent/view' GET

In request header

set Content-Type : application/json
set auth-token   : token

token that was recieved when Agent hit the
previous Agent Login POST Route.

Success(200)=> Displays Customers details as customers Array JSON response.

5.)GET get agent_id by email passed as param in request url.
-------------------------------------------------
'credsBay/api/agent/view/EMAIL'

replace Email with agent email.

In request header

set Content-Type : application/json
set auth-token   : token

Success(200):gives agent_id associated to that email.

6.)POST Create a loan request
--------------------------------------------------
'/credsBay/api/agent/loan/new'

Access- Agent Only ,
 though , Hypothetically Admin have all the info regarding every user they can use the customer_id and agent_id to create a new loan request also.

 send raw data in body as JSON Object
{
     "customer_id":"String",
     "interest":Number,
     "agent_id":"String",
     "tenure_in_months":Number(in months)
}

NOTE->

customer_id and agent_id can be obtained by hitting the get all customer information and get agent_id by email routes.

Success(200):returns a {
  loan_req_id:"String"
}

7.) View Loans Details For all Customers.
----------------------------------------------
GET '/credsBay/api/loans/view'


In request header

set Content-Type : application/json
set auth-token   : token

Success(200):gives Loans Object with all loan requests in the database.

8.) Edit/Update Route Agent Only
---------------------------------------
PATCH '/credsBay/api/agent/loan/edit/loan_req_id'

replace loan_req_id with the loan_id you want to make changes to.

send raw data in body as JSON array
[
    {"propName":propName,"value":value}
]

replace propName with the property you want to change and value with the new value you want to set for this property.

In request header

set Content-Type : application/json
set auth-token   : token (String)
set agent_id     : agent_id (String)



9.) Approve Loan By Admin Only
------------------------------------
PATCH
'/credsBay/api/admin/loanApproval/loan_id'

replace loan_id with the _id of the loan you want to approve or reject.

send Raw JSON object in request body
{
    "admin_id":"String",
    "loan_decision":"'Accepted' or 'Rejected'"
}

In request header

set Content-Type : application/json
set auth-token   : token

10.) get info about the loan details and status Customer can only view their own loan details.
-------------------------------------------

POST
'/credsBay/api/Customer/view/MyLoanStatus'

send Raw data in request body

{
    "email":"String",
    "password":"String"
}

11.)Get Loan Request By mentioned Date till now.
------------------------------------

GET
'/credsBay/api/loan/view/byDate'

Send Raw data in request Body as JSON

{
    "by_date":"YYYY-MM-DD"
}

replace YYYY-MM-DD with the date you want to filter loan request.

In request header

set Content-Type : application/json
set auth-token   : token
