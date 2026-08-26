require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// HOME
app.get("/", (req, res) => {
  res.json({
    message: "CloudStock API is running successfully!"
  });
});


// TEST MYSQL CONNECTION
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      server: "running",
      database: "MySQL connected"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// GET ORDERS USING SQL JOINS
app.get("/orders", async (req, res) => {
  try {

    const [rows] = await db.query(`
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

      ORDER BY o.id
    `);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});


// SALES ANALYTICS USING GROUP BY
app.get("/analytics/top-products", async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT
        p.name,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.quantity * oi.unit_price) AS revenue

      FROM products p

      JOIN order_items oi
        ON p.id = oi.product_id

      GROUP BY p.id, p.name

      ORDER BY units_sold DESC
    `);

    res.json(rows);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CloudStock running on http://localhost:${PORT}`);
});