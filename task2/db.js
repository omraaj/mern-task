const {MongoClient}=require("mongodb");
require('dotenv').config;

const uri=process.env.MONGODB_URL;
const client=new MongoClient(uri);


async function connectToDatabase(){
    try {
        await client.connect();
        console.log('Connected to database');
        return client.db();
        // res.status(200).json
        
    } catch (error) {
        console.log('Error Connecting to MongoDB',error);
        // res.status(500).json({error:'Error Connecting to MongoDB'})
    }
}

module.exports=connectToDatabase;















