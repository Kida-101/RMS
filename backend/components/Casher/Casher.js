import express from "express";
const app = express.Router();

import dashboard from'./compinents/Casher_dashboard.js';
app.use('/dashboard',dashboard)
import paid_bill from'./compinents/Casher_paid_bill.js';
app.use('/paid_bill',paid_bill)

import Casher_payment_receive from'./compinents/Casher_payment_receive.js';
app.use('/casher_payment_receive',Casher_payment_receive)
export default app;
