const express = require('express'); // Express framework
const router = express.Router(); // Create router
const { connectDB, ObjectId } = require('../db'); // Database connection and ObjectId

// GET /api/lessons
router.get('/lessons', async (_req, res) => {
  try {
    const db = await connectDB(); // Connect to DB
    const lessons = await db.collection('lessons').find({}).toArray(); // Fetch all lessons
    res.json(lessons); // Respond with lessons
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/lessons/:id
router.get('/lessons/:id', async (req, res) => {
  try {
    const db = await connectDB(); // Connect to DB
    const lesson = await db.collection('lessons') 
      .findOne({ _id: new ObjectId(req.params.id) }); // Fetch lesson by ID
    if (!lesson) return res.status(404).send('Lesson not found');
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// PUT /api/lessons/:id  (update any fields — esp. availableInventory)
router.put('/lessons/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const update = { $set: req.body }; // e.g. { availableInventory: 4 }
    const result = await db.collection('lessons')
      .findOneAndUpdate({ _id: new ObjectId(req.params.id) }, update, { returnDocument: 'after' });
    if (!result.value) return res.status(404).send('Lesson not found');
    res.json(result.value); // Return updated lesson
  } catch (err) {
    res.status(400).json({ error: 'Invalid id or payload' });
  }
});

module.exports = router;
