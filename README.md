# VueApp-Backend
Backend server for the **VueApp** project.
Build with **Node.js** and **Express.js**.

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

- GET http://localhost:3001/ -> Returns a simpel welcome message.
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

*Node.js
*Express.js
*Router
*CORS middleware

###  Live API (Render)
https://vueapp-backend.onrender.com/ (Only on request)

- REST API routes:  
  - `GET /api/lessons`  
  - `GET /api/lessons/:id`  
  - `PUT /api/lessons/:id`  
  - `POST /api/orders`  
  - `GET /api/orders`


## Author: Tommaso


