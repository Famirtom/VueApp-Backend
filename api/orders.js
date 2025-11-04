const express = require('express');
const router = express.Router();
const { connectDB, ObjectId } = require('../db');

router.post('/orders', async (req, res) => {
  try {
    const { firstName, lastName, phone, items, total } = req.body;
    if (!firstName || !lastName || !phone || !Array.isArray(items) || typeof total !== 'number') {
      return res.status(400).json({ error: 'Invalid order payload' });
    }
    const db = await connectDB();
    const doc = { firstName, lastName, phone, items, total, createdAt: new Date() };
    const { insertedId } = await db.collection('orders').insertOne(doc);
    res.status(201).json({ _id: insertedId, ...doc });
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating order' });
  }
});

// GET /api/orders
router.get('/orders', async (_req, res) => {
  const db = await connectDB();
  const orders = await db.collection('orders').find().sort({ createdAt: -1 }).toArray();
  res.json(orders);
});

module.exports = router;
