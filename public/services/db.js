var mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

const urlMain = 'mongodb://localhost:27018/BabyCare'; // Change this if your MongoDB URL is different
const dbName = 'products'; // Update with your actual database name

async function connectDB() {
    try {
        console.log('urlMain:', urlMain);
        const client = new MongoClient(urlMain, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}




var url = urlMain;

//var products = mongoConnectionClient.db(dbName);

exports.mongoose = mongoose;
//exports.products = dbName;
exports.url = url;
module.exports = connectDB;
