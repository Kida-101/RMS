import express from "express";
const app = express.Router();

import dashboard from'./compinents/Kitchen_Dashboard.js';
app.use('/dashboard',dashboard)
import Assign_Order from'./compinents/Kitchen_Assign_Order.js';
app.use('/assign_order',Assign_Order)

export default app;
