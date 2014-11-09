var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var mongoConnectionClient = new MongoClient(new MongoServer('localhost', 27018, {native_parser: true}));;
var url = process.env['OPENSHIFT_MONGODB_DB_URL']+'babycare' || 'mongodb://localhost:27018/BabyCare';

var userCollection = mongoConnectionClient.db('userDB');

exports.userCollection = userCollection;
exports.url = url;