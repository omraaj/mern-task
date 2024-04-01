

const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();
let db; 


(async () => {
    db = await connectToDatabase();
})();

router.get('/piechart', async (req, res) => {
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
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ];

       
        const result = await db.collection('transactions').aggregate(pipeline).toArray();

       
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
    }
});

module.exports = router;
