import express from "express";
import pool from "../../../database.js"; // Make sure this path is correct

// Use 'router' convention for Express Router
const router = express.Router();

// Middleware to parse JSON request bodies (applied only to this router)
router.use(express.json());

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Test route
router.get("/test", (req, res) => {
  res.send("Casher Payment Receive Route is working");
});

// Route to fetch unpaid ONSITE orders for today
router.get('/unpaid', async (req, res) => {
  const today = getTodayDate();

  // Optimized Query: Removed unnecessary joins (bookings, third_party for onsite view)
  // Refined GROUP BY clause
  const readQuery = `
    SELECT
      tb.table_number AS table,
      o.order_type,
      STRING_AGG(mi.name || ' x' || oi.quantity, ', ') AS food_items, -- Aggregate item names and quantities
      s.total_amount,
      TO_CHAR(s.updated_at, 'YYYY-MM-DD HH12:MI AM') AS payment_time, -- Use updated_at as per original
      s.payment_method,
      -- Select waiter's name for Onsite orders
      CASE
        WHEN o.order_type = 'Onsite' THEN COALESCE(u.full_name, 'N/A') || ' (Waiter)' -- Fallback if user name is missing
        ELSE 'Unknown Payer' -- Should not happen with WHERE clause but safe practice
      END AS waiter_name, -- Changed alias to be specific
      s.id AS sale_id
    FROM sales s
    JOIN orders o ON s.order_id = o.id
    LEFT JOIN order_items oi ON o.id = oi.order_id       -- Join to get items associated with the order
    LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id -- Join to get item names
    LEFT JOIN users u ON o.waiter_id = u.id           -- Join to get waiter details based on order's waiter_id
    LEFT JOIN table_book tb ON o.table_id = tb.id       -- Join to get table number
    WHERE
      DATE(s.updated_at) = $1  -- Filter by the update date of the sale = today
      AND s.is_paid = false      -- Filter for unpaid sales
      AND o.order_type = 'Onsite'  -- Filter specifically for Onsite orders
    GROUP BY
      s.id,             -- Group by sale ID (primary key) makes other sale columns deterministic
      tb.table_number,  -- Need table number in group by as it's selected
      o.order_type,     -- Need order type in group by for CASE statement logic (though filtered)
      u.full_name       -- Need user name in group by for CASE statement logic
      -- s.total_amount, s.updated_at, s.payment_method are functionally dependent on s.id
    ORDER BY
      s.updated_at DESC; -- Show most recently updated unpaid orders first
  `;

  try {
    console.log("Fetching Unpaid Onsite Orders for:", today);
    const { rows } = await pool.query(readQuery, [today]); // Destructure rows directly
    // Send the results back to the frontend
    res.json(rows);
  } catch (error) {
    // Enhanced Error Logging
    console.error("-----------------------------------------");
    console.error("Error in /unpaid endpoint (Casher Payment Receive):");
    console.error("Timestamp:", new Date().toISOString());
    console.error("Full Error Object:", error);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    console.error("-----------------------------------------");
    res.status(500).json({ error: 'Failed to fetch unpaid onsite orders' });
  }
});

// Route to mark a sale record as paid
router.post('/paid', async (req, res) => {
  const { sale_id } = req.body; // Get sale_id from the request body

  // Validate input
  if (!sale_id || isNaN(parseInt(sale_id))) { // Check if sale_id is provided and is a number
    return res.status(400).json({ error: 'Valid Sale ID is required' });
  }

  // Query to update the specific sale record
  const updateQuery = `
    UPDATE sales
    SET
      is_paid = true,
      updated_at = CURRENT_TIMESTAMP -- Optionally update the timestamp when paid
    WHERE id = $1
    RETURNING id; -- Return the ID to confirm which record was updated
  `;

  try {
    console.log(`Attempting to mark sale_id ${sale_id} as paid.`);
    const result = await pool.query(updateQuery, [sale_id]);

    // Check if any row was actually updated
    if (result.rowCount > 0) {
        console.log(`Sale ID ${result.rows[0].id} marked as paid successfully.`);
      res.status(200).json({ message: `Order (Sale ID: ${result.rows[0].id}) marked as paid successfully` });
    } else {
        console.warn(`Sale ID ${sale_id} not found or already paid.`);
      // If no rows affected, the sale_id likely didn't exist or matched criteria
      res.status(404).json({ error: `Sale with ID ${sale_id} not found or could not be updated.` });
    }
  } catch (error) {
    // Enhanced Error Logging
    console.error("-----------------------------------------");
    console.error("Error in /paid endpoint (Casher Payment Receive):");
    console.error("Timestamp:", new Date().toISOString());
    console.error("Request Body:", req.body);
    console.error("Full Error Object:", error);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    console.error("-----------------------------------------");
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

export default router; // Export the router