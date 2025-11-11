const express = require('express');
const router = express.Router();
const { connectDB, ObjectId } = require('../db');

// GET /api/lessons
router.get('/lessons', async (_req, res) => {
  try {
    const db = await connectDB();
    const lessons = await db.collection('lessons').find({}).toArray();
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/lessons/:id
router.get('/lessons/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const filter = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };

    const lesson = await db.collection('lessons').findOne(filter);
    if (!lesson) return res.status(404).send('Lesson not found');
    res.json(lesson);
  } catch (err) {
    console.error("Error fetching lessonS by ID: ", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/lessons/:id
router.put('/lessons/:id', async (req, res) => {
  console.log('Incoming PUT:', req.params.id);
  console.log('Body received:', req.body);

  try {
    const db = await connectDB();
    const { id } = req.params;

    const filter = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };

    const update = { $set: req.body };

    // Upgrade for MongoDB Node.js Driver 4.x
    const result = await db.collection('lessons').findOneAndUpdate(
      filter,
      update,
      { returnDocument: 'after', includeResultMetadata: true }
    );

    console.log('Mongo result:', result);

    // verify if an update occurred
    const updated =
      result?.value ||
      result?.lastErrorObject?.n === 1 ||
      result?.lastErrorObject?.updatedExisting;

    if (!updated) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // All good
    res.status(200).json({
      message: 'Lesson updated successfully!',
      updatedLesson: result.value || req.body
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: 'Invalid id or payload' });
  }
});



module.exports = router;
