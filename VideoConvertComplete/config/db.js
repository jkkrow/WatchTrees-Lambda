const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

exports.clientPromise = client.connect();
