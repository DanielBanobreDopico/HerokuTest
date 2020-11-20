const MongoClient = require('mongodb').MongoClient;

// Provided URL example: mongodb+srv://testing:<password>@cluster0.76x98.mongodb.net/<dbname>?retryWrites=true&w=majority
const username = 'testing';
const password = 'tpnx37zr62S38uV';
const host = 'cluster0.76x98.mongodb.net';
const defaultDBname = 'MyMainDB';
const uri = `mongodb+srv://${username}:${password}@${host}/${defaultDBname}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoClient;