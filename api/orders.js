const express = require("express");
const router = express.Router();

/**
 * In-memory store just for the lab.
 * Later you’ll replace this with MongoDB.
 */
const orders = [];

/**
 * POST /api/orders
 * Body example:
 * {
 *   "firstName": "Tom",
 *   "lastName": "Rossi",
 *   "phone": "1234567890",
 *   "items": [{ "id": 1, "qty": 2, "price": 100 }],
 *   "total": 200
 * }
 */
router.post("/orders", (req, res) => {
  const { firstName, lastName, phone, items, total } = req.body;

  // 1) Minimal validation (so we don’t accept garbage)
  if (
    !firstName || !lastName || !phone ||
    !Array.isArray(items) || items.length === 0 ||
    typeof total !== "number"
  ) {
    return res.status(400).json({ error: "Invalid order payload" });
  }

  // Optional: validate each item has id/qty/price numbers
  const badItem = items.find(
    it => typeof it.id !== "number" || typeof it.qty !== "number" || typeof it.price !== "number"
  );
  if (badItem) return res.status(400).json({ error: "Invalid item in items[]" });

  // 2) Create a server-side order object
  const order = {
    id: orders.length + 1,     // simple incremental id
    firstName,
    lastName,
    phone,
    items,
    total,
    createdAt: new Date().toISOString()
  };

  // 3) Save in-memory
  orders.push(order);

  // 4) Respond with the created order (201 Created)
  return res.status(201).json(order);
});

/**
 * GET /api/orders
 * Simple endpoint to see what has been posted (dev only).
 */
router.get("/orders", (req, res) => {
  res.json(orders);
});

module.exports = router;
