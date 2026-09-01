# CloudStock — SQL Order Management System

CloudStock is a backend application for managing and analysing product and order data using a relational MySQL database.

The project demonstrates practical implementation of **SQL, relational database concepts, Express.js REST APIs, database connectivity, SQL JOINs, aggregation, and sales analytics**.

---

## Tech Stack

- JavaScript
- Node.js
- Express.js
- MySQL
- SQL
- mysql2
- dotenv

---

## Features

- Connects an Express.js server with a MySQL database
- Retrieves product information through REST API endpoints
- Retrieves customer order details using multiple SQL JOINs
- Calculates total value for individual order items
- Performs sales analytics using SQL aggregation
- Identifies top-selling products
- Calculates total units sold and generated revenue
- Provides an API health check for MySQL connectivity
- Uses environment variables for database configuration

---

## Project Structure


cloudstock-sql-order-management/
│
├── config/
│   └── db.js
│
├── database/
│   ├── schema.sql
│   └── demo_queries.sql
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md

Database Design

The application uses MySQL as its relational database.

The main entities used in the system are:

Customers
Products
Orders
Order Items

These tables are connected using relational database concepts such as primary keys and foreign keys.

The relationships allow order information to be retrieved by combining multiple tables using SQL JOIN operations.

API Endpoints
Home
GET /

Checks whether the CloudStock API server is running.

Example response:

{
  "message": "CloudStock API is running successfully!"
}
Database Health Check
GET /health

Checks whether the application can successfully connect to MySQL.

Example response:

{
  "server": "running",
  "database": "MySQL connected"
}
Get All Products
GET /products

Retrieves all products stored in the products table.

SQL query used:

SELECT * FROM products;
Get Orders
GET /orders

Retrieves detailed order information by combining data from:

orders
customers
order_items
products

The endpoint returns:

Order ID
Customer name
Product name
Quantity
Unit price
Total price

SQL query:

SELECT
    o.id AS order_id,
    c.name AS customer,
    p.name AS product,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS total
FROM orders o

JOIN customers c
    ON o.customer_id = c.id

JOIN order_items oi
    ON o.id = oi.order_id

JOIN products p
    ON oi.product_id = p.id

ORDER BY o.id;
Top Products Analytics
GET /analytics/top-products

Returns sales analytics for products.

The endpoint calculates:

Product name
Total units sold
Revenue generated

SQL query:

SELECT
    p.name,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM products p

JOIN order_items oi
    ON p.id = oi.product_id

GROUP BY p.id, p.name

ORDER BY units_sold DESC;
SQL Concepts Used

This project demonstrates the following SQL and DBMS concepts:

Relational Database Design
Primary Keys
Foreign Keys
SQL JOINs
GROUP BY
Aggregate Functions
SUM
Calculated Columns
Table Relationships
MySQL Database Connectivity
Backend Concepts Used

The backend demonstrates:

Node.js
Express.js
REST API routing
MySQL database integration
Asynchronous database queries
JSON responses
Error handling
Environment variables
Environment Variables

Database credentials are stored using environment variables.

Create a .env file in the root directory:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000

The .env file should not be uploaded to GitHub.

Installation
1. Clone the Repository
git clone https://github.com/Vrinda2106/cloudstock-sql-order-management.git
2. Open the Project Directory
cd cloudstock-sql-order-management
3. Install Dependencies
npm install
4. Configure MySQL

Create the required MySQL database and tables using the SQL files available inside the database folder.

Configure your database credentials inside the .env file.

5. Run the Server
node server.js

The application will run on:

http://localhost:3000
Dependencies

The project uses the following Node.js packages:

express
mysql2
dotenv
cors
Learning Outcomes

Through this project, I gained practical experience with:

Designing relational databases
Writing SQL queries
Using SQL JOINs across multiple tables
Performing aggregation using GROUP BY and SUM
Connecting Node.js applications to MySQL
Building REST API endpoints using Express.js
Handling asynchronous database queries
Returning JSON responses from backend APIs
Organising database and backend code
Future Improvements

Future enhancements may include:

Add product creation API
Add order creation API
Update and delete operations
Inventory update functionality
User authentication
Input validation
Order status tracking
Advanced sales analytics
Cloud deployment
Author

Ishita

B.Tech Computer Science and Engineering
VIT Vellore
