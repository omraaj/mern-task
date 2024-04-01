

const express = require('express');
const connectToDatabase = require('../db');

const router = express.Router();
let db; 


(async () => {
    db = await connectToDatabase();
})();

router.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;

        
        const pipeline = [
            {
                $match: {
                    dateOfSale: { $regex: `.*-${month}-.*`, $options: 'i' } 
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$price" }, 
                    totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } }, 
                    totalUnsoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } } 
                }
            }
        ];

      
        const result = await db.collection('transactions').aggregate(pipeline).toArray();

      
        const statistics = result[0]; 

       
        res.status(200).json(statistics);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
