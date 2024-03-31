// routes/statistics.js

const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();
let db; // Store reference to the database connection

// Initialize the database connection
(async () => {
    db = await connectToDatabase();
})();

router.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;

        // Construct aggregation pipeline to calculate statistics
        const pipeline = [
            {
                $match: {
                    dateOfSale: { $regex: `.*-${month}-.*`, $options: 'i' } // Match month regardless of year
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$price" }, // Calculate total sale amount
                    totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } }, // Calculate total number of sold items
                    totalUnsoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } } // Calculate total number of unsold items
                }
            }
        ];

        // Execute aggregation pipeline
        const result = await db.collection('transactions').aggregate(pipeline).toArray();

        // Extract statistics from aggregation result
        const statistics = result[0]; // Since we're grouping by null, there will be only one result

        // Return statistics as JSON response
        res.status(200).json(statistics);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
