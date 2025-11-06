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
    // convert ID from string to number
    const numericId = parseInt(req.params.id);
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    // check "id" field in lessons collection
    const lesson = await db.collection('lessons') 
      .findOne({ id: numericId }); // Fetch lesson by ID

    if (!lesson) {
      return res.status(404).send('Lesson not found');
    } 
    res.json(lesson);
  } catch (err) {
    console.error("Error fetching lessonS by ID: ", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/lessons/:id  (update any fields — esp. availableInventory)
router.put('/lessons/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const update = { $set: req.body }; // e.g. { availableInventory: 4 }
    const result = await db.collection('lessons')
      .findOneAndUpdate({ id: parseInt(req.params.id) }, update, { returnDocument: 'after' });
    if (!result.value) return res.status(404).send('Lesson not found');
    res.json(result.value); // Return updated lesson
  } catch (err) {
    console.error("Error updating lesson: ", err);
    res.status(400).json({ error: 'Invalid id or payload' });
  }
});

module.exports = router;
