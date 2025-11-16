// app.js - Main application file for VueApp-Backend
// THis file configures the Express.js web server, connects it to MongoDB
// and defines how requests form the fornt-end are handles.

// 'dotenv' loads environment variables from a .env file into process.env
// 'cors' allows cross-origin requests from the front-end hosted on GitHub Pages

require('dotenv').config(); // Load environment variables from .env file
const express = require("express"); // Express framework
const cors = require("cors"); // allows Cross-Origin Resource Sharing form front end on GItHub pages
const path = require("path"); // Handle Path module
const fs = require("fs"); // File system module
const { connectDB } = require("./db");   // Database connection module


// routes imports
const lessonsRouter = require("./api/lessons"); // Lessons API router
const ordersRouter  = require("./api/orders");  // Orders API router

// Create Express app
const app = express(); 
const PORT = process.env.PORT || 3001; // Server port

// Middleware to handle CORS
// how it works:
// 1. allow requests from specific origins
// 2. allow specific HTTP methods
// 3. allow specific headers
// 4. handle preflight OPTIONS requests
app.use(cors({
  origin: ['http://127.0.0.1:3001', 'http://localhost:3001', 'https://famirtom.github.io'],
  methods: ['GET','POST','PUT','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options('*', cors());

// Parse JSON bodies for POST/PUT
app.use(express.json());

// log each request for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to serve images with 404 handling
const imagePath = path.resolve(__dirname, "images");

app.use("/images", (req, res, next) => {
  const filePath = path.join(imagePath, req.path);
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist
      console.log(`[404] Image not found: ${req.path}`);
      return res.status(404).json({ 
        error: 'Image not found',
        path: req.path 
      });
    }
    
    // File exists, serve it
    express.static(imagePath)(req, res, next);
  });
});

// Mount routers under /api
app.use("/api", lessonsRouter);
app.use("/api", ordersRouter);

// Default route
app.get("/", (req, res) => res.send("Welcome to VueApp-Backend API"));

// 404 handler
app.use((req, res) => {
  console.log(`[404] Resource not found: ${req.url}`);
  res.status(404).send("Resource not found");
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
    console.log(` Images folder: ${imagePath}`);
  });
});