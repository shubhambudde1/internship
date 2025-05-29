const express = require('express');
const router = express.Router();
const db = require("./udb.cjs").promise();

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to order return MySQL database.');
  }
});
// Add item to cart and remove previous entries for this user
router.post('/add-all', async (req, res) => {
  const { user_id, items } = req.body;
  console.log(req.body);
  if (!user_id || !Array.isArray(items)) {
    return res.status(400).json({ error: 'user_id and items array required' });
  }
  try {
    // Remove all previous cart items for this user
    await db.query('DELETE FROM cart_items');

    // Insert new cart items
    const insertPromises = items.map(item =>
      db.query(
        `INSERT INTO cart_items (user_id, product_id, product_name, price, quantity, selected_size, selected_color, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          item.id,
          item.name,
          item.price,
          item.quantity || 1,
          item.selectedSize,
          item.colors && item.colors[item.selectedColor] ? item.colors[item.selectedColor].name : null,
          item.image
        ]
      )
    );
    await Promise.all(insertPromises);
    res.json({ message: 'All cart items replaced in database' });
  } catch (err) {
    console.error('Error adding all cart items:', err);
    res.status(500).json({ error: 'Failed to add all cart items' });
  }
});

module.exports = router;