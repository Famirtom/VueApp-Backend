const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const { connectDB, ObjectId } = require('../db'); // Database connection and ObjectId

// GET /api/lessons
// how it works:
// 1. connect to the database
// 2. query the lessons collection for all documents
// 3. respond with the lessons data in JSON format
// 4. handle any database errors
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
// how it works:
// 1. connect to the database
// 2. extract the id from req.params
// 3. create a filter based on whether the id is a valid ObjectId
// 4. query the lessons collection for a document matching the filter
// 5. if no lesson is found, respond with 404
// 6. if found, respond with the lesson data in JSON format
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
// how it works:
// 1. log the incoming id and body
// 2. connect to the database
// 3. create a filter based on whether the id is a valid ObjectId
// 4. create an update object with the new data from req.body
// 5. use findOneAndUpdate to update the lesson and return the updated document
// 6. check if an update occurred by examining result properties
// 7. respond with success message and updated lesson or error if not found
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
// search lessos GET api/search?query=
// HOW IT WORK:
// Take the quare paramenter q from req.query.q
// Use $regex to create a case-insensitive search pattern
// Return lessons where any of the fields match the search term
// if q is empty, return all lessons
router.get('/search', async (req, res) => {
  try {
    const term = req.query.q?.trim() || '';
    const db = await connectDB();
    if(!term) {
      // if there are no terms ---> return all lessons
      const lessons = await db.collection('lessons').find({}).toArray();
      return res.json(lessons);
    }
    const regex = new RegExp(term, 'i'); // case-insensitive search

    const results = await db.collection('lessons').find({
      $or: [
        { subject: { $regex: regex } },
        { location: { $regex: regex } },
        { description: { $regex: regex } },
        { duration: { $regex: regex } }
      ]
    }).toArray();

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Database error' });
  }
}); 


module.exports = router;
