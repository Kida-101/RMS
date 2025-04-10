import express from "express";
const app = express.Router();

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

app.get("/dashboard_day", async (req, res) => {
  const today = getTodayDate();

  const readQuery = `
    SELECT 
      COALESCE(SUM(total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN order_type = 'Online' THEN total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN order_type = 'Onsite' THEN total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN order_type = 'Third-Party' THEN total_amount ELSE 0 END), 0) AS third_party
    FROM sales
    JOIN orders ON sales.order_id = orders.id
    WHERE DATE(sale_date) = $1 AND is_paid = true;
  `;

  try {
    const { rows } = await pool.query(readQuery, [today]);
    res.json(rows[0]); // Returns { total, online, onsite, third_party }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching daily dashboard data");
  }
});

app.get("/dashboard_month", async (req, res) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const summaryQuery = `
    SELECT 
      COALESCE(SUM(total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN order_type = 'Online' THEN total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN order_type = 'Onsite' THEN total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN order_type = 'Third-Party' THEN total_amount ELSE 0 END), 0) AS third_party
    FROM sales
    JOIN orders ON sales.order_id = orders.id
    WHERE 
      EXTRACT(YEAR FROM sale_date) = $1 AND 
      EXTRACT(MONTH FROM sale_date) = $2 AND 
      is_paid = true;
  `;

  const breakdownQuery = `
    SELECT 
      EXTRACT(DAY FROM sale_date) AS day,
      SUM(total_amount) AS total,
      SUM(CASE WHEN order_type = 'Online' THEN total_amount ELSE 0 END) AS online,
      SUM(CASE WHEN order_type = 'Onsite' THEN total_amount ELSE 0 END) AS onsite,
      SUM(CASE WHEN order_type = 'Third-Party' THEN total_amount ELSE 0 END) AS third_party
    FROM sales
    JOIN orders ON sales.order_id = orders.id
    WHERE 
      EXTRACT(YEAR FROM sale_date) = $1 AND 
      EXTRACT(MONTH FROM sale_date) = $2 AND 
      is_paid = true
    GROUP BY day
    ORDER BY day;
  `;

  try {
    const summaryResult = await pool.query(summaryQuery, [year, month]);
    const breakdownResult = await pool.query(breakdownQuery, [year, month]);

    res.json({
      ...summaryResult.rows[0],
      breakdown: breakdownResult.rows, // array of daily data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching monthly dashboard data");
  }
});

app.get("/dashboard_year", async (req, res) => {
  const year = new Date().getFullYear();

  const summaryQuery = `
    SELECT 
      COALESCE(SUM(total_amount), 0) AS total,
      COALESCE(SUM(CASE WHEN order_type = 'Online' THEN total_amount ELSE 0 END), 0) AS online,
      COALESCE(SUM(CASE WHEN order_type = 'Onsite' THEN total_amount ELSE 0 END), 0) AS onsite,
      COALESCE(SUM(CASE WHEN order_type = 'Third-Party' THEN total_amount ELSE 0 END), 0) AS third_party
    FROM sales
    JOIN orders ON sales.order_id = orders.id
    WHERE 
      EXTRACT(YEAR FROM sale_date) = $1 AND 
      is_paid = true;
  `;

  const breakdownQuery = `
    SELECT 
      EXTRACT(MONTH FROM sale_date) AS month,
      SUM(total_amount) AS total,
      SUM(CASE WHEN order_type = 'Online' THEN total_amount ELSE 0 END) AS online,
      SUM(CASE WHEN order_type = 'Onsite' THEN total_amount ELSE 0 END) AS onsite,
      SUM(CASE WHEN order_type = 'Third-Party' THEN total_amount ELSE 0 END) AS third_party
    FROM sales
    JOIN orders ON sales.order_id = orders.id
    WHERE 
      EXTRACT(YEAR FROM sale_date) = $1 AND 
      is_paid = true
    GROUP BY month
    ORDER BY month;
  `;

  try {
    const summaryResult = await pool.query(summaryQuery, [year]);
    const breakdownResult = await pool.query(breakdownQuery, [year]);

    res.json({
      ...summaryResult.rows[0],
      breakdown: breakdownResult.rows, // array of monthly data
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching yearly dashboard data");
  }
});

app.get("/dashboard_alltime", async (req, res) => {
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
    res.json(rows[0]); // Return object with totals
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching all-time dashboard data");
  }
});

export default app;
