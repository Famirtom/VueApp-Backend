// api/lessons.js
const express = require("express"); // Import Express framework
const router = express.Router(); // Create a router instance

// Mock lessons data
const lessons = [
  { id: 1, subject: "Math", location: "London", price: 100 },
  { id: 2, subject: "Science", location: "Paris", price: 120 },
  { id: 3, subject: "History", location: "Rome", price: 90 }
];

// GET /api/lessons
router.get("/lessons", (req, res) => { // Handle GET requests to /lessons
  res.json(lessons);
});

// GET /api/lessons/:id
router.get("/lessons/:id", (req, res) => {
  const lessonId = Number(req.params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  if (lesson) return res.json(lesson);
  res.status(404).send("Lesson not found");
});

module.exports = router;
