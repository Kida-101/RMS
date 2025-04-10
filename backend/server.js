require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000; // Default to 4000 if PORT is not defined in .env

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World! Your server is running on the configured port.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
