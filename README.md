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

the server will run at http:/localhost:3000

---

## Available Endpoints

GET/ -> Returns a simpel welcome message.
GET/lessons -> Returns a JSON list of lessons.

---
## Technologies

*Node.js
*Express.js
*Nodemon (Development only)

###  Live API (Render)
https://vueapp-backend.onrender.com/

- REST API routes:  
  - `GET /api/lessons`  
  - `GET /api/lessons/:id`  
  - `PUT /api/lessons/:id`  
  - `POST /api/orders`  
  - `GET /api/orders`
## Database Collections 
lessons (exsample)
{
  "_id": "ObjectId",
  "subject": "Web Development",
  "location": "London",
  "price": 249.99,
  "availableInventory": 5,
  "rating": 4,
  "image": "Images/web.png"
}


## Author: Tommaso


