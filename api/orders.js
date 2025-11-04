const express = require('express'); // Express framework
const router = express.Router(); // Create router
const { connectDB, ObjectId } = require('../db'); // Database connection and ObjectId

// POST /api/orders

router.post('/orders', async (req, res) => {
  try {
    const { firstName, lastName, phone, items, total } = req.body; // Destructure order details
    if (!firstName || !lastName || !phone || !Array.isArray(items) || typeof total !== 'number') {
      return res.status(400).json({ error: 'Invalid order payload' }); // Validate payload
    }

    const db = await connectDB(); // Connect to DB
    const doc = { firstName, lastName, phone, items, total, createdAt: new Date() }; // Create order document
    const { insertedId } = await db.collection('orders').insertOne(doc); // Insert into 'orders' collection
    res.status(201).json({ _id: insertedId, ...doc }); // Respond with created order
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating order' }); // Handle errors
  }
});

// GET /api/orders
router.get('/orders', async (_req, res) => {
  const db = await connectDB(); // Connect to DB
  const orders = await db.collection('orders').find().sort({ createdAt: -1 }).toArray(); // Fetch all orders sorted by creation date
  res.json(orders);
});

module.exports = router;
