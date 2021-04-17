# Status : Working On it...

To Do ->
5143
In operator



# MySQL+Node.js CRUD API


Basics of MySQL & collaboration with Nodejs.

Prerequisite:
-------------------
* MySQL community edition with MySQL Workbench,Server,Router(Developer default Config. Refer Docs for Installation guide.)

* MySQL Fundamentals.

* Express and Node.js Fundamentals

* REST API, Routing and CRUD Past Implementation Knowledge.

* Incase New to Both MySQL and Node.js visit Free Code Camp for Fundamentals.

* MySQL
For Documentation and Installation Visit https://www.mysql.com/

Abstract Steps to be Followed-
-----------------------
* Install MySQL on your machine a/c to your operating system(Duhhhh...)!

* Set up the connection during the installation providing a password or set up a connection after installation in the MySQL Workbench via MySQL Connection + sign.

* click on the instance created to open your workbench.

# Basic SQL and MySQL workbench

* SQL cheatsheet with code samples https://codewithmosh.lpages.co/sql-cheat-sheet/

* SQL is not a case sensitive language but best practices are to use capital letters for keyword like USE,CREATE etc.

* FROM,WHERE,ORDER BY are optional but we often use them in sql to make the search meaningfull.

* SELECT 1, 2 will show 2 columns with value 1 and 2 respectively.

* the Order in which we write the FROM WHERE ORDER BY matters it must be in this order -> SELECT -> FROM -> WHERE->ORDER BY

* -- this is a comment "--" is used in MySQL for comments.

* Arithmatic expression used in SELECT clause follow the BODMAS rule i.e multiply and divide have higher priority over addition and subtraction in terms of execution.

* 30 * 10 + 100 = 400 RIGHT
* 30 * 10 + 100 = 3300 WRONG

* to counter this pririty rule we can use () or reorder the + and * or - and / according to our requirements.

* (30+10)*100 =4000 RIGHT first the expression in the paranthesis is evaluated even if it is + over *

* AS is used to give alias name like
 SELECT points,(points+10)*100
 FROM student  AS Count;

 * so the output column name will be points|Count  and not points|(points+10)*100

 * to have alias with space just enclose the alias in '' or "" like
 SELECT points,(points+10)*100
 FROM student  AS 'Count students';

* DISTINCT to get unique records/values of that column name.

* SELECT DISTINCT points FROM student;

* WHERE clause is used to filter data with condition.

* example SELECT * FROM student WHERE points>3000;

* Comparison operators are >,>=,<,<=,=,!= or <>

* where != and <> are not equal operators

* AND clause to attach multiple conditions together Both must be true.
like SELECT name,unit_price,(unit_price*1.1)  AS new_price
FROM products WHERE unit_price > '1.21' AND (unit_price*1.1) < '2.486';

* OR only one condition has to be true to be display that records.

* In case we Use both AND OR then AND is evaluated First because it has higher priority.

* We can counter the AND precedence by using a () then the expression in the () will be evaluated first even if it was OR

* SELECT name,unit_price,(unit_price*1.1)  AS new_price
FROM products WHERE
 (unit_price > '1.21' OR unit_price*1.1 < '2.486')
 AND name = 'Longan';

* NOT operator evalautes the negation of the specified operator inside the brackets and then display the records a/c to that inverse condition and operators.

* Like SELECT name,unit_price,(unit_price*1.1)  AS new_price
FROM products WHERE
 NOT ((unit_price > '1.21' OR unit_price*1.1 < '2.486') AND name = 'Longan');

* Due to NOT the above query is evaluated as
WHERE (unit_price < '1.21' OR unit_price*1.1>'2.486') OR
name != 'Longan';

* NOT logic i.e the negation logic helps us to write better and conscise query also without using the NOT operator.

*



#Features
#Routes
