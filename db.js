// db.js — native MongoDB driver (no mongoose)
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

let db; // cached DB handle

async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('VueApp'); // your DB name in Atlas
  console.log('MongoDB connected (native driver)');
  return db;
}

module.exports = { connectDB, ObjectId };
