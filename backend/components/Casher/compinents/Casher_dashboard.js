// dashboardRoutes.js
import express from "express";
import pool from "../../../database.js";  // Ensure correct relative path

const app = express.Router();

// Utility function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Test endpoint
app.get('/test', (req, res) => {
  res.send("caasher is working");
});

// Daily dashboard route
app.get('/day', async (req, res) => {
  const today = getTodayDate();

  const readQuery = `
    SELECT 
      COALESCE(SUM(s.total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END), 0) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE DATE(s.sale_date) = $1 AND s.is_paid = true;
  `;

  try {
    const { rows } = await pool.query(readQuery, [today]);
    res.json(rows[0]); // Returns { total, online, onsite, third_party }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching daily dashboard data");
  }
});

// Monthly dashboard route
app.get('/month', async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JavaScript months are 0-indexed

  const summaryQuery = `
    SELECT 
      COALESCE(SUM(s.total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END), 0) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE 
      EXTRACT(YEAR FROM s.sale_date) = $1 AND 
      EXTRACT(MONTH FROM s.sale_date) = $2 AND 
      s.is_paid = true;
  `;

  const breakdownQuery = `
    SELECT 
      EXTRACT(DAY FROM s.sale_date) AS day,
      SUM(s.total_amount) AS total,
      SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END) AS online,
      SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END) AS onsite,
      SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE 
      EXTRACT(YEAR FROM s.sale_date) = $1 AND 
      EXTRACT(MONTH FROM s.sale_date) = $2 AND 
      s.is_paid = true
    GROUP BY day
    ORDER BY day;
  `;

  try {
    const summaryResult = await pool.query(summaryQuery, [year, month]);
    const breakdownResult = await pool.query(breakdownQuery, [year, month]);

    res.json({
      ...summaryResult.rows[0],
      breakdown: breakdownResult.rows, // array containing daily breakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching monthly dashboard data");
  }
});

// Yearly dashboard route
app.get('/year', async (req, res) => {
  const year = new Date().getFullYear();

  const summaryQuery = `
    SELECT 
      COALESCE(SUM(s.total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END), 0) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE 
      EXTRACT(YEAR FROM s.sale_date) = $1 AND 
      s.is_paid = true;
  `;

  const breakdownQuery = `
    SELECT 
      EXTRACT(MONTH FROM s.sale_date) AS month,
      SUM(s.total_amount) AS total,
      SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END) AS online,
      SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END) AS onsite,
      SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE 
      EXTRACT(YEAR FROM s.sale_date) = $1 AND 
      s.is_paid = true
    GROUP BY month
    ORDER BY month;
  `;

  try {
    const summaryResult = await pool.query(summaryQuery, [year]);
    const breakdownResult = await pool.query(breakdownQuery, [year]);

    res.json({
      ...summaryResult.rows[0],
      breakdown: breakdownResult.rows, // array containing monthly breakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching yearly dashboard data");
  }
});

// All-time dashboard route
app.get('/alltime', async (req, res) => {
  const query = `
    SELECT 
      COALESCE(SUM(s.total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END), 0) AS third_party
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    WHERE s.is_paid = true;
  `;

  try {
    const { rows } = await pool.query(query);
    res.json(rows[0]); // Returns an object with overall totals
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching all-time dashboard data");
  }
});

export default app;
