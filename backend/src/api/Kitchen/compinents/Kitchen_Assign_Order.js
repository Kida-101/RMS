// routes/kitchenDashboardRoutes.js
import express from "express";
import pool from "../../../../database.js"; // Adjust path as needed

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


export default router;