// src/routes/api/cashier-report.js

import express from "express";
import pool from "../../../database.js"; // Adjust path as needed

const router = express.Router();

// Helper function (keep as is)
const getCurrentDateInfo = () => {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1, // JS months are 0-indexed
        day: today.getDate(),
        isoDate: today.toISOString().split("T")[0],
    };
};

// --- Test Route (keep as is) ---
router.get('/test', (req, res) => {
    res.send("Cashier report route is working");
});

// --- Daily Report Endpoint (keep as is) ---
router.get('/daily', async (req, res) => {
    const { date } = req.query;
    const reportDate = date || getCurrentDateInfo().isoDate;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(reportDate)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    try {
        const query = `
            SELECT
                s.id,
                o.order_type AS type,
                TO_CHAR(s.sale_date, 'HH12:MI AM') AS time,
                s.total_amount AS total
            FROM sales s
            JOIN orders o ON s.order_id = o.id
            WHERE DATE(s.sale_date) = $1
            AND s.is_paid = TRUE
            ORDER BY s.sale_date;
        `;
        // Log the query and params for debugging
        console.log("Executing Daily Query:", query, [reportDate]);
        const result = await pool.query(query, [reportDate]);
        res.json(result.rows);
    } catch (err) {
        // Enhanced Logging
        console.error("-----------------------------------------");
        console.error("Error in /daily endpoint:");
        console.error("Timestamp:", new Date().toISOString());
        console.error("Query Params:", req.query);
        console.error("Full Error Object:", err); // Log the whole error object
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        console.error("-----------------------------------------");
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// --- Monthly Report Endpoint ---// --- Monthly Report Endpoint ---
// --- Monthly Report Endpoint ---
router.get('/monthly', async (req, res) => {
    const { year: queryYear, month: queryMonth } = req.query;
    const current = getCurrentDateInfo();
    const reportYear = queryYear ? parseInt(queryYear) : current.year;
    const reportMonth = queryMonth ? parseInt(queryMonth) : current.month;

    if (isNaN(reportYear) || isNaN(reportMonth) || reportMonth < 1 || reportMonth > 12) {
        return res.status(400).json({ error: 'Invalid year or month provided.' });
    }

    try {
        // Query with the GROUP BY fix applied previously
        const query = `
            SELECT
                EXTRACT(DAY FROM s.sale_date)::VARCHAR AS day,
                SUM(s.total_amount) AS total,
                SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END) AS online,
                SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END) AS onsite,
                SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END) AS "thirdParty"
            FROM sales s
            JOIN orders o ON s.order_id = o.id
            WHERE EXTRACT(YEAR FROM s.sale_date) = $1
              AND EXTRACT(MONTH FROM s.sale_date) = $2
              AND s.is_paid = TRUE
            GROUP BY DATE(s.sale_date), EXTRACT(DAY FROM s.sale_date) -- Corrected GROUP BY
            ORDER BY DATE(s.sale_date);
        `;
        console.log("Executing Monthly Query:", query, [reportYear, reportMonth]);
        const result = await pool.query(query, [reportYear, reportMonth]);

        const formattedResult = result.rows.map(row => ({
            day: `Day ${row.day}`,
            total: parseFloat(row.total),
            online: parseFloat(row.online),
            onsite: parseFloat(row.onsite),
            thirdParty: parseFloat(row.thirdParty),
        }));
        res.json(formattedResult);

    } catch (err) {
        // Enhanced Logging
        console.error("-----------------------------------------");
        console.error("Error in /monthly endpoint:");
        console.error("Timestamp:", new Date().toISOString());
        console.error("Query Params:", req.query);
        // REMOVE OR COMMENT OUT THIS LINE:
        // console.error("Report Year/Month:", { reportYear, reportMonth });
        console.error("Full Error Object:", err);
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        console.error("-----------------------------------------");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- Yearly Report Endpoint (keep as is, but add similar logging if needed) ---
router.get('/yearly', async (req, res) => {
    const { year: queryYear } = req.query;
    const current = getCurrentDateInfo();
    const reportYear = queryYear ? parseInt(queryYear) : current.year;

    if (isNaN(reportYear)) {
        return res.status(400).json({ error: 'Invalid year provided.' });
    }

    try {
        const query = `
            SELECT
                TO_CHAR(s.sale_date, 'Month') AS month,
                EXTRACT(MONTH FROM s.sale_date) AS month_num,
                SUM(s.total_amount) AS total,
                SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END) AS online,
                SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END) AS onsite,
                SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END) AS "thirdParty"
            FROM sales s
            JOIN orders o ON s.order_id = o.id
            WHERE EXTRACT(YEAR FROM s.sale_date) = $1
              AND s.is_paid = TRUE
            GROUP BY month, month_num
            ORDER BY month_num;
        `;
         // Log the query and params for debugging
        console.log("Executing Yearly Query:", query, [reportYear]);
        const result = await pool.query(query, [reportYear]);

        const formattedResult = result.rows.map(row => ({
            month: row.month.trim(),
            total: parseFloat(row.total),
            online: parseFloat(row.online),
            onsite: parseFloat(row.onsite),
            thirdParty: parseFloat(row.thirdParty),
        }));
        res.json(formattedResult);
    } catch (err) {
         // Enhanced Logging
        console.error("-----------------------------------------");
        console.error("Error in /yearly endpoint:");
        console.error("Timestamp:", new Date().toISOString());
        console.error("Query Params:", req.query);
        console.error("Report Year:", reportYear);
        console.error("Full Error Object:", err); // Log the whole error object
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        console.error("-----------------------------------------");
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// --- Customizable Date Range Report Endpoint ---
// --- Customizable Date Range Report Endpoint ---
// --- Customizable Date Range Report Endpoint ---
router.get('/custom', async (req, res) => {
    const { start, end } = req.query;

    // --- Add this log ---
    console.log("[CUSTOM] Initial req.query:", { start, end });

    if (!start || !end) {
        console.log("[CUSTOM] Validation Fail: Missing dates");
        return res.status(400).json({ error: 'Both start and end dates are required.' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
         console.log("[CUSTOM] Validation Fail: Invalid date format");
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }
    if (new Date(start) > new Date(end)) {
        console.log("[CUSTOM] Validation Fail: Start date after end date");
        return res.status(400).json({ error: 'Start date cannot be after end date.' });
    }

     // --- Add this log ---
    console.log("[CUSTOM] Passed validation. Values:", { start, end });

    try {
        // Query with the GROUP BY fix applied previously
        const query = `
            SELECT
                TO_CHAR(s.sale_date, 'YYYY-MM-DD') AS date,
                SUM(s.total_amount) AS total,
                SUM(CASE WHEN o.order_type = 'Online' THEN s.total_amount ELSE 0 END) AS online,
                SUM(CASE WHEN o.order_type = 'Onsite' THEN s.total_amount ELSE 0 END) AS onsite,
                SUM(CASE WHEN o.order_type = 'Third-Party' THEN s.total_amount ELSE 0 END) AS "thirdParty"
            FROM sales s
            JOIN orders o ON s.order_id = o.id
            WHERE s.sale_date >= $1::date
              AND s.sale_date < ($2::date + interval '1 day')
              AND s.is_paid = TRUE
            GROUP BY TO_CHAR(s.sale_date, 'YYYY-MM-DD')
            ORDER BY TO_CHAR(s.sale_date, 'YYYY-MM-DD');
        `;

        // --- ADD THIS LOG RIGHT BEFORE USAGE ---
        console.log("[CUSTOM] About to execute query. Checking scope:", { queryExists: !!query, startExists: typeof start !== 'undefined', startValue: start, endExists: typeof end !== 'undefined', endValue: end });

        // Original Log Line (Likely around 199)
        console.log("Executing Custom Query:", query, [start, end]);

        // Query Execution
        const result = await pool.query(query, [start, end]);

        const formattedResult = result.rows.map(row => ({
            date: row.date,
            total: parseFloat(row.total),
            online: parseFloat(row.online),
            onsite: parseFloat(row.onsite),
            thirdParty: parseFloat(row.thirdParty),
        }));
        res.json(formattedResult);
    } catch (err) {
        console.error("-----------------------------------------");
        console.error("Error in /custom endpoint:");
        console.error("Timestamp:", new Date().toISOString());
        console.error("Query Params:", req.query); // Keep this
        // console.error("Report Dates:", { start, end }); // Comment out if causing issues
        console.error("Full Error Object:", err);
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        console.error("-----------------------------------------");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router; // Export the router