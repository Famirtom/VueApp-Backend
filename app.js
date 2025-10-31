const express = require("express");
const path = require("path");

const lessonsRouter = require("./api/lessons");
const ordersRouter  = require("./api/orders");  // <-- NEW

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies for POST/PUT
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Static images
const imagePath = path.resolve(__dirname, "images");
app.use("/images", express.static(imagePath));

// Mount routers under /api
app.use("/api", lessonsRouter);
app.use("/api", ordersRouter);  // <-- NEW

// Default
app.get("/", (req, res) => res.send("Welcome to VueApp-Backend API"));

// 404
app.use((req, res) => res.status(404).send("Resource not found"));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
