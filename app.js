const express = require('express');
const app = express();
const PORT = 3000;

// Middleware thta allow the server to sponde to Jason
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello from VueApp-Backend!');
});

// Lessons Route
app.get('/lessons', (req, res) => {
  const lessons = [
    { id: 1, subject: 'Math', location: 'London', price: 100, availableInventory: 5 },
    { id: 2, subject: 'Science', location: 'Paris', price: 120, availableInventory: 3 },
    { id: 3, subject: 'History', location: 'Rome', price: 90, availableInventory: 10 }
  ];
  res.json(lessons); // Send lessons as JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
