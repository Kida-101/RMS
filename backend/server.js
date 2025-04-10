require('dotenv').config();
const express = require('express');
const app = express();
const pg = require('pg');
const cors = require('cors');
const port = process.env.PORT; // Default to 4000 if PORT is not defined in .env


// Middleware
app.use(cors());
app.use(express.json());


const Casher = require('./components/Casher/Casher');
app.use('/casher',Casher)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
