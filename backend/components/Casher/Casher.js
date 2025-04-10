const express = require('express');
const app = express.Router();

const dashboard = require('./compinents/Casher_dashboard.js');
app.use('/dashboard',dashboard)


module.exports = app