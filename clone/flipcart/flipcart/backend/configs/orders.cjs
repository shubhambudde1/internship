const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");
const moment = require('moment');
const date = moment().format('YYYY-MM-DD HH:mm:ss'); // Define the date variable

// Check database connection
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database order connected successfully!');
// });

// POST route to insert a new order
router.post('/', (req, res) => {
  const { status, totalCost, name, address, phone, paymentMethod, items, products } = req.body;
  console.log('Received data:', req.body); // Log the entire request body
  console.log('Products:', products); // Specifically log the products field

  if (!products) {
    return res.status(400).send({ message: 'Products field is missing or null' });
  }

  const sql = 'INSERT INTO orders (date, status, totalCost, name, address, phone, paymentMethod, products) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [date, status, totalCost, name, address, phone, paymentMethod, products], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send({ message: 'Database insert error' });
    }
    res.send({ message: 'Order added successfully!', orderId: result.insertId });
  });
});
// GET route to retrieve all orders
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM orders';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return res.status(500).send({ message: 'Database retrieval error' });
    }
    res.send(result);
  });
});

module.exports = router;
