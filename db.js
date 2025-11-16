// ConnectDB() explanation
// Enstablishes a single reusalbe connection to MongoDB atlas 
// Uses the native MongoDB driver instead of Mongoodse
// returns the database instance fro performing CRUD operations
const { MongoClient, ObjectId } = require('mongodb');
// Connection URI
const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri); // MongoDB client instance

let db; // cached DB handle
// Connect to MongoDB
async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('VueApp'); // your DB name in Atlas
  console.log('MongoDB connected');
  return db;
}

module.exports = { connectDB, ObjectId };
