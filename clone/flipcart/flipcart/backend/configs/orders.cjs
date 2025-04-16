const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");

// // Check database connection
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database connected successfully!');
// });


const moment = require('moment');

 
// POST: Add a new order and its items
router.post('/', (req, res) => {
  const { date, status, totalCost, name, address, phone, paymentMethod, items } = req.body;

  // Format the date correctly
  const formattedDate = moment(date, moment.ISO_8601, true).isValid()
    ? moment(date).format('YYYY-MM-DD HH:mm:ss')
    : moment().format('YYYY-MM-DD HH:mm:ss'); // Use current date if date is invalid

  // Insert the order into the `orders` table
console.log(req.body);
  const orderQuery = `
    INSERT INTO orders (date, status, totalCost, name, address, phone, paymentMethod)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const orderValues = [
    formattedDate,
    status || 'Pending',
    totalCost || 0,
    name,
    address,
    phone,
    paymentMethod,
  ];

  db.query(orderQuery, orderValues, (err, result) => {
    if (err) {
      console.error('Error inserting order into the database:', err);
      res.status(500).json({ message: 'Failed to place the order.' });
      return;
    }

    const orderId = result.insertId;

    // Insert the items into the `order_items` table
    const itemQuery = `
      INSERT INTO order_items (order_id, product_name, price, quantity)
      VALUES ?
    `;
    const itemValues = items.map((item) => [
      orderId,
      item.name,
      item.price,
      item.quantity || 1, // Default quantity to 1 if null
    ]);

    db.query(itemQuery, [itemValues], (err) => {
      if (err) {
        console.error('Error inserting items into the database:', err);
        res.status(500).json({ message: 'Failed to place the order items.' });
        return;
      }

      res.status(201).json({ message: 'Order placed successfully', orderId });
    });
  });
});

// GET: Retrieve all orders with their items
router.get('/', (req, res) => {
  const query = `
    SELECT o.*, i.product_name, i.price, i.quantity
    FROM orders o
    LEFT JOIN order_items i ON o.id = i.order_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving orders from the database:', err);
      res.status(500).json({ message: 'Failed to retrieve orders.' });
      return;
    }

    // Group items by order
    const orders = results.reduce((acc, row) => {
      const { id, date, status, totalCost, name, address, phone, paymentMethod, product_name, price, quantity } = row;

      if (!acc[id]) {
        acc[id] = {
          id,
          date,
          status,
          totalCost,
          name,
          address,
          phone,
          paymentMethod,
          items: [],
        };
      }

      if (product_name) {
        acc[id].items.push({ product_name, price, quantity });
      }

      return acc;
    }, {});

    res.status(200).json(Object.values(orders));
  });
});

module.exports = router;
