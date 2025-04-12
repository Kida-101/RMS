import express from "express";
import pool from "../../../database.js"; // Make sure this path is correct for your project

const app = express.Router();

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

app.get('/test', (req, res) => {
  res.send("cashier is working");
});

app.get('/PaidBill', async (req, res) => {
  const today = getTodayDate();

  const readQuery = `
    SELECT 
      tb.table_number AS table,
      o.order_type,
      STRING_AGG(mi.name || ' x' || oi.quantity, ', ') AS food_items,
      s.total_amount,
      TO_CHAR(s.updated_at, 'YYYY-MM-DD HH12:MI AM') AS payment_time,
      s.payment_method,
      -- Improved payer output
      CASE
        WHEN o.order_type = 'Online' THEN COALESCE(b.full_name, 'Customer') || ' (Customer)'
        WHEN o.order_type = 'Onsite' THEN COALESCE(u.full_name, 'Waiter') || ' (Waiter)'
        WHEN o.order_type = 'Third-Party' THEN COALESCE(tp.company_name, 'Partner Company') || ' (Partner Company)'
        ELSE 'Unknown Payer'
      END AS payer
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
    LEFT JOIN users u ON o.waiter_id = u.id
    LEFT JOIN bookings b ON o.id = b.order_id
    LEFT JOIN third_party tp ON o.third_party_id = tp.id
    LEFT JOIN table_book tb ON o.table_id = tb.id
    WHERE DATE(s.updated_at) = $1
      AND s.is_paid = true
    GROUP BY 
      tb.table_number,
      o.order_type,
      s.total_amount,
      s.updated_at,
      s.payment_method,
      b.full_name,
      u.full_name,
      tp.company_name
    ORDER BY s.updated_at DESC;
  `;

  try {
    console.log("Fetching Paid Bills for:", today); // Debug
    const result = await pool.query(readQuery, [today]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching paid bills:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Failed to fetch paid bills' });
  }
});

export default app;
