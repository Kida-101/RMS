import express from "express";

import pool from "../../../database.js";

const app = express.Router();

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

app.get('/test', (req, res) => {
  res.send("cashier is working");
});

export default app;
