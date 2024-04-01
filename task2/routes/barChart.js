

const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();
let db; 


(async () => {
    db = await connectToDatabase();
})();

router.get('/barchart', async (req, res) => {
    try {
        let { month } = req.query;
        
        if (!month) {
            month = "03";
        }

        
        const pipeline = [
            {
                $match: {
                    dateOfSale: { $regex: `.*-${month}-.*`, $options: 'i' } 
                }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
                    default: "901-above",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    priceRange: {
                        $concat: [
                            { $toString: "$_id" },
                            { $cond: [{ $eq: ["$_id", 900] }, "+", "-" ] }
                        ]
                    },
                    count: 1
                }
            }
        ];

      
        const result = await db.collection('transactions').aggregate(pipeline).toArray();

      
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Failed to fetch bar chart data' });
    }
});

module.exports = router;
