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
