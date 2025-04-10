import express from "express";
const app = express.Router();

import dashboard from'./compinents/Casher_dashboard.js';
app.use('/dashboard',dashboard)


export default app;
