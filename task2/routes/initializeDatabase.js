const express=require('express');
const axios=require('axios');
const connectToDatabase=require('../db');

const router = express.Router();

router.get('/start',async(req,res)=>{
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        const jsondata=response.data;

        const db= await connectToDatabase();

        const collection = db.collection('transactions');
        await collection.insertMany(jsondata);

        res.status(200).json({message:'DataBase initialized successfully'});

    } catch (error) {
        console.log('Error initializing database',error);
        res.status(500).json({error:'Failed initializing database'});
    }
})

module.exports=router;







































