const MongoClient = require('mongodb').MongoClient;

/**
 * Provided URL example:
 *      mongodb+srv://testing:<password>@cluster0.76x98.mongodb.net/<dbname>?retryWrites=true&w=majority
 */ 
const password = 'iWWRoQcYbd914BOk';
const defaultDBname = '';
const uri = `mongodb+srv://testing:${password}@cluster0.76x98.mongodb.net/${defaultDBname}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoClient;