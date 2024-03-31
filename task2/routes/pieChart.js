// routes/pieChart.js

const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();
let db; // Store reference to the database connection

// Initialize the database connection
(async () => {
    db = await connectToDatabase();
})();

router.get('/piechart', async (req, res) => {
    try {
        let { month } = req.query;
        
        // Set default month to "March" if not provided
        if (!month) {
            month = "03";
        }

        // Construct aggregation pipeline to group transactions by category
        const pipeline = [
            {
                $match: {
                    dateOfSale: { $regex: `.*-${month}-.*`, $options: 'i' } // Match month regardless of year
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ];

        // Execute aggregation pipeline
        const result = await db.collection('transactions').aggregate(pipeline).toArray();

        // Return result as JSON response
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
});

module.exports = router;
