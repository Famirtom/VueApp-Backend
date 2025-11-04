require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { connectDB } = require("./db");  

const lessonsRouter = require("./api/lessons");
const ordersRouter  = require("./api/orders");  

const app = express();

// CORS
app.use(cors({
  origin: ['http://127.0.0.1:3001', 'http://localhost:3001', 'https://famirtom.github.io'],
  methods: ['GET','POST','PUT','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.options('*', cors());

const PORT = process.env.PORT || 3000;

// Parse JSON bodies for POST/PUT
app.use(express.json());

// Middleware for logging requests
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