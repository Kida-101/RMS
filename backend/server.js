const express = require("express");
const app = express();
const port = 4000;
const { Pool } = require("pg");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Routes
const menu = require("./components/menu/menu");
const reception = require("./components/reception/reception");
const reservation = require("./components/reservation/reservation");
const table = require("./components/table/table");

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

app.use("/api/menu", menu);
// app.use("/api/reception", reception);
// app.use("/api/reservation", reservation);
// app.use("/api/table", table);

// Home route
app.get("/", (req, res) => res.send("Welcome to RMS api"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
