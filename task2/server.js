const express = require('express');
require('dotenv').config();
const cors = require('cors'); // Import the cors middleware
const initializeDataBaseRouter = require('./routes/initializeDatabase');
const listTransactions = require('./routes/allTransactions');
const statistics = require('./routes/statistics');
const barChart = require('./routes/barChart');
const pieChart = require('./routes/pieChart');
const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(initializeDataBaseRouter);
app.use(listTransactions);
app.use(statistics);
app.use(barChart);
app.use(pieChart);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
