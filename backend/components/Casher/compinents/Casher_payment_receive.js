import express from "express";
import pool from "../../../database.js"; // Make sure this path is correct for your project

const app = express.Router();

// Middleware to parse JSON request bodies
app.use(express.json());

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

app.get("/test", (req, res) => {
  res.send("Casher Payment Receive Route");
});

// Route to fetch unpaid onsite orders
app.get('/unpaid', async (req, res) => {
  const today = getTodayDate();

  const readQuery = `
    SELECT 
      tb.table_number AS table,
      o.order_type,
      STRING_AGG(mi.name || ' x' || oi.quantity, ', ') AS food_items,
      s.total_amount,
      TO_CHAR(s.updated_at, 'YYYY-MM-DD HH12:MI AM') AS payment_time,
      s.payment_method,
      CASE
        WHEN o.order_type = 'Onsite' THEN COALESCE(u.full_name, 'Waiter') || ' (Waiter)'
        ELSE 'Unknown Payer'
      END AS payer,
      s.id AS sale_id
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
    LEFT JOIN users u ON o.waiter_id = u.id
    LEFT JOIN bookings b ON o.id = b.order_id
    LEFT JOIN third_party tp ON o.third_party_id = tp.id
    LEFT JOIN table_book tb ON o.table_id = tb.id
    WHERE DATE(s.updated_at) = $1
      AND s.is_paid = false
      AND o.order_type = 'Onsite'
    GROUP BY 
      tb.table_number,
      o.order_type,
      s.total_amount,
      s.updated_at,
      s.payment_method,
      b.full_name,
      u.full_name,
      tp.company_name,
      s.id
    ORDER BY s.updated_at DESC;
  `;

  try {
    console.log("Fetching Unpaid Onsite Orders for:", today);
    const result = await pool.query(readQuery, [today]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching unpaid onsite orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch unpaid onsite orders' });
  }
});

// Route to mark an order as paid
app.post('/paid', async (req, res) => {
  const { sale_id } = req.body;

  if (!sale_id) {
    return res.status(400).json({ error: 'Sale ID is required' });
  }

  const updateQuery = `
    UPDATE sales
    SET is_paid = true
    WHERE id = $1;
  `;

  try {
    const result = await pool.query(updateQuery, [sale_id]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Order marked as paid successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order payment status:', error.message);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

export default app;
