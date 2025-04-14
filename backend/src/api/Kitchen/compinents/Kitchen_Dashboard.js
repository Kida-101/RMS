// routes/kitchenDashboardRoutes.js
import express from "express";
import pool from "../../../../database.js";  // Adjust path as needed

const router = express.Router();

// Utility function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    // Adjust for timezone if necessary, otherwise use local time
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset*60*1000));
    return localToday.toISOString().split("T")[0];
};
router.get('/test', (req, res) => {
  res.send("kichen dashbord is working");
});
// --- Daily Kitchen Stats ---
router.get('/day', async (req, res) => {
    const today = getTodayDate(); // Gets YYYY-MM-DD

    // Query counts for orders created today
    const query = `
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty",
            COUNT(*) FILTER (WHERE status = 'pending') AS pending,
            COUNT(*) FILTER (WHERE status = 'assigned') AS assigned,
            COUNT(*) FILTER (WHERE status = 'served') AS served
            -- As before, 'delivered' needs clarification based on your specific logic.
            -- Assuming 'served' implies completed for this dashboard's purpose.
            -- If not, you might need a join or different logic.
        FROM orders
        WHERE DATE(created_at) = $1;
    `;

    try {
        const { rows } = await pool.query(query, [today]);
        let stats = rows[0] || {};

        // Ensure all keys exist, defaulting to 0, and parse to integer
        const defaultStats = { total: 0, online: 0, onsite: 0, thirdParty: 0, pending: 0, assigned: 0, served: 0, delivered: 0 };
        stats = { ...defaultStats, ...stats }; // Merge defaults with query results

        for (const key in stats) {
            stats[key] = parseInt(stats[key] || 0, 10);
        }
        // Set delivered based on served for now
        stats.delivered = stats.served;

        res.json(stats);
    } catch (err) {
        console.error('Error fetching daily kitchen data:', err);
        res.status(500).send("Error fetching daily kitchen data");
    }
});

// --- Monthly Kitchen Stats ---
router.get('/month', async (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JavaScript months are 0-indexed

    // Query for monthly summary counts
    const summaryQuery = `
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty"
        FROM orders
        WHERE EXTRACT(YEAR FROM created_at) = $1
          AND EXTRACT(MONTH FROM created_at) = $2;
    `;

    // Query for daily breakdown counts within the month
    const breakdownQuery = `
        SELECT
            EXTRACT(DAY FROM created_at) AS day,
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty"
            -- You could add status counts here if needed for the breakdown
            -- COUNT(*) FILTER (WHERE status = 'pending') AS pending, etc.
        FROM orders
        WHERE EXTRACT(YEAR FROM created_at) = $1
          AND EXTRACT(MONTH FROM created_at) = $2
        GROUP BY day
        ORDER BY day;
    `;

    try {
        const summaryResult = await pool.query(summaryQuery, [year, month]);
        const breakdownResult = await pool.query(breakdownQuery, [year, month]);

        let summaryStats = summaryResult.rows[0] || {};
        const defaultSummary = { total: 0, online: 0, onsite: 0, thirdParty: 0 };
        summaryStats = { ...defaultSummary, ...summaryStats };

        // Parse summary stats to integer
        for (const key in summaryStats) {
             summaryStats[key] = parseInt(summaryStats[key] || 0, 10);
        }

        // Parse breakdown stats to integer
        const breakdownStats = breakdownResult.rows.map(row => {
            const parsedRow = { day: parseInt(row.day, 10) };
            parsedRow.total = parseInt(row.total || 0, 10);
            parsedRow.online = parseInt(row.online || 0, 10);
            parsedRow.onsite = parseInt(row.onsite || 0, 10);
            parsedRow.thirdParty = parseInt(row.thirdParty || 0, 10);
             // Add other statuses if queried
            return parsedRow;
        });


        res.json({
            ...summaryStats,
            breakdown: breakdownStats,
        });
    } catch (err) {
        console.error('Error fetching monthly kitchen data:', err);
        res.status(500).send("Error fetching monthly kitchen data");
    }
});

// --- Yearly Kitchen Stats ---
router.get('/year', async (req, res) => {
    const year = new Date().getFullYear();

    // Query for yearly summary counts
    const summaryQuery = `
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty"
        FROM orders
        WHERE EXTRACT(YEAR FROM created_at) = $1;
    `;

    // Query for monthly breakdown counts within the year
    const breakdownQuery = `
        SELECT
            EXTRACT(MONTH FROM created_at) AS month,
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty"
            -- Add status counts if needed: COUNT(*) FILTER (WHERE status = 'pending') AS pending, etc.
        FROM orders
        WHERE EXTRACT(YEAR FROM created_at) = $1
        GROUP BY month
        ORDER BY month;
    `;

    try {
        const summaryResult = await pool.query(summaryQuery, [year]);
        const breakdownResult = await pool.query(breakdownQuery, [year]);

        let summaryStats = summaryResult.rows[0] || {};
         const defaultSummary = { total: 0, online: 0, onsite: 0, thirdParty: 0 };
         summaryStats = { ...defaultSummary, ...summaryStats };

        // Parse summary stats to integer
         for (const key in summaryStats) {
             summaryStats[key] = parseInt(summaryStats[key] || 0, 10);
         }

         // Parse breakdown stats to integer
         const breakdownStats = breakdownResult.rows.map(row => {
             const parsedRow = { month: parseInt(row.month, 10) }; // Month number (1-12)
             parsedRow.total = parseInt(row.total || 0, 10);
             parsedRow.online = parseInt(row.online || 0, 10);
             parsedRow.onsite = parseInt(row.onsite || 0, 10);
             parsedRow.thirdParty = parseInt(row.thirdParty || 0, 10);
              // Add other statuses if queried
             return parsedRow;
        });

        res.json({
            ...summaryStats,
            breakdown: breakdownStats,
        });
    } catch (err) {
        console.error('Error fetching yearly kitchen data:', err);
        res.status(500).send("Error fetching yearly kitchen data");
    }
});

// --- All-Time Kitchen Stats ---
router.get('/alltime', async (req, res) => {
    // Query for all-time summary counts
    const query = `
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE order_type = 'Online') AS online,
            COUNT(*) FILTER (WHERE order_type = 'Onsite') AS onsite,
            COUNT(*) FILTER (WHERE order_type = 'Third-Party') AS "thirdParty"
        FROM orders;
    `;

    try {
        const { rows } = await pool.query(query);
        let stats = rows[0] || {};
        const defaultStats = { total: 0, online: 0, onsite: 0, thirdParty: 0 };
        stats = { ...defaultStats, ...stats }; // Merge defaults

        // Parse stats to integer
        for (const key in stats) {
            stats[key] = parseInt(stats[key] || 0, 10);
        }

        res.json(stats);
    } catch (err) {
        console.error('Error fetching all-time kitchen data:', err);
        res.status(500).send("Error fetching all-time kitchen data");
    }
});

export default router;