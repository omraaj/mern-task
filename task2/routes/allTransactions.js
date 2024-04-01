const express = require('express');
const connectToDatabase = require('../db');
const { options } = require('./initializeDatabase');

const router =express.Router();

let db;
(async ()=>{
   db = await connectToDatabase();
})();

router.get('/getlist',async(req,res)=>{
    try {
        const { month, search = '', page = 1, perPage = 60 } = req.query;

       
        let query = {};
        if (month) {
            query.dateOfSale = { $regex: `.*-${month}-.*`, $options: 'i' };
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: parseFloat(search) }
            ];
        }

    
        let cursor;
        if (Object.keys(query).length === 0) {
            cursor = db.collection('transactions').find();
        } else {
            cursor = db.collection('transactions').find(query);
        }

   
        const perPageInt = parseInt(perPage, 10);
        const transactions = await cursor
            .skip((page - 1) * perPageInt)
            .limit(perPageInt)
            .toArray()
        // await db.close();

       
        res.status(200).json({ transactions });

    } catch (error) {
        console.log('Error Listing transactions',error);
        res.status(500).json({error:'Failed to list Transaction'})
    }
})


module.exports=router;


























