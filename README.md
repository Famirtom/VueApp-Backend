## Overview

This backend provides the RESTful API for the VueApp project.
it is hosted on Render and connects to a MongoDB Atlas database.
The API handles lessosn, order, and full-text search.

# VueApp-Backend
Backend server for the **VueApp** project.
Build with **Node.js** ,**Express.js** and **MongoDB driver**.

---

## Run locally
Clone the repository and install dependencies:

git clone https://github.com/Famirtom/VueApp-Backend.git
cd VueApp-Backend
npm install

Make sure to create a .env file with: Your Mongodb_URI

### Start the server:
npm start

the server will run at http:/localhost:3001

---

## Available Endpoints

- GET http://localhost:3001/ -> Returns a simple welcome message.
- GET http://localhost:3001/api/lessons -> Returns a JSON list of lessons.
- GET http://localhost:3001/api/lessons/:id -> Return a JSON format of one lesson
- POST http://localhost:3001/api/order -> Create an Order
- Example of order form:
{
  "firstName": "Name",
  "lastName": "Surname",
  "phone": "Number",
  "items": [
    { "subject": "Java Programming", "qty": 2, "price": 300 },
    { "subject": "Web Development", "qty": 1, "price": 249.99 }
  ],
  "total": 849.99
}

---
## Technologies

* Node.js - JavaScript runtime
* Express.js - Web Server framework
* MongoDB (Atlas) - NoSQL database
* dotenv - Environment variable management
* CORS - Middleware for cross-origin requests
* nodemon  - for local development

## Middleware overview
* Express.json() - Parse incoming JSON payloads
* cors() - Enable communication with the GitHUb pages frontend
* Logging Middleware -  Displays HTTP method and URL for each request
* Static middleware - Serves images with 404 fallback

###  Live API (Render)
URL: https://vueapp-backend.onrender.com/ (Only on request)

The frontend (hosted on GitHub page) communicates with this backend (on Render) through REST API calls:
Action | Front-end -> Back-end |  Method
Load all lessons | `/api/lessons` | GET
Search lessons | `/api/search?q=term` | GET
Update inventory | `/api/lessons/:id` | PUT
place order | `/api/orders` | POST
retrieve all order | `/api/orders` | GET


## Author: Tommaso


