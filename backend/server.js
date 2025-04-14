import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import appRouter from "./src/routers/index.js";


const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api", appRouter);

app.get("/", (req, res) => {
  res.send("Hello, World! Your server is running on the configured port.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
