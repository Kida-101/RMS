const express = require("express");
const app = express();
const port = 4000;
const { Pool } = require("pg");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Routes
const menuRoutes = require("./components/menu/menuRoutes");
const receptionRoutes = require("./components/reception/receptionRoutes");
const reservationRoutes = require("./components/reservation/reservationRoutes");
const tableRoutes = require("./components/table/tableRoutes");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "RMS",
  password: "199322",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error", err.stack);
  } else {
    console.log("Connected to PostgreSQL!");
  }
});

app.get("/", (req, res) => res.send("API is running..."));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
