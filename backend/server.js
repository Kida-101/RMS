import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pg from "pg";
import appRouter from "./src/routers/index.js";
const app = express();
const port = process.env.PORT; // Default to 4000 if PORT is not defined in .env

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", appRouter);
app.get("/", (req, res) => {
  res.send("Hello, World! Your server is running on the configured port.");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
