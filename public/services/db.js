var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var mongoConnectionClient = new MongoClient(new MongoServer('localhost', 27018, {native_parser: true}));;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
	var url = process.env.OPENSHIFT_MONGODB_DB_URL + 'babycare';	
}
 else {
 	var url = 'mongodb://localhost:27018/BabyCare';
 }

var products = mongoConnectionClient.db('products');

exports.mongoose = mongoose;
exports.products = products;
exports.url = url;