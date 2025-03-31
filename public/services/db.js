var mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27018/BabyCare'; // Change this if your MongoDB URL is different
const dbName = 'products'; // Update with your actual database name

async function connectDB() {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;

/*if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	var url = process.env.OPENSHIFT_MONGODB_DB_URL + 'babycare';	
}
 else {
 	var url = 'mongodb://localhost:27018/BabyCare';
 }*/

//var products = mongoConnectionClient.db(dbName);

exports.mongoose = mongoose;
//exports.products = products;
exports.url = url;
