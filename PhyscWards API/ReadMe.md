UNDER CONSTRUCTION
--------------------------------
-hit /physcwards/api for api documentations and how to make requests.

Author-> Jasmeet Singh Bali

Project-> PhyscWards

Description-> Mock REST API for Hypothetical Web/App Portal where psychiatrists can register their patients,update,get patient records and a scheduler that notifies the patient about the appointments via email.

Stack->Node.js,Express,MongoDB,Cloudinary

Features
----------------------------------------
-Doctor Register themselves with the portal by hitting the '/physcwards/api/doctor/register' route(unprotected).

-Doctor Hits the login route '/physcwards/api/doctor/login' and receives a JWT token.(unprotected route).

-Doctor Register or adds new patient to the database with relevant information,
by hitting the '/physcwards/api/doctor/user/new_patient'(protected route  with JWT token & session management.)

-Doctor Add, Updates , Delete , GET patient Info for the patient registered by them.(Protected route and session management)

-Add a scheduler to notify weekly from the date of patient record added  about their appointment with the Doctor.

-Apply proper Validation checks for New Doctor Registration and Patient added.

-populate the database with a 100 mock patient records dump for testing.

-Postman collection and host the API live.

Extras(To be done after the above points are implemented successfully.)

-Admin route '/physcwards/api/admin' Full access delete, add, update, fetch custom access request patient and doctor info access with 2fa authentication.(Implement this at last).


Routes
-----------------------------------------
