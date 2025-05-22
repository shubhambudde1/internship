const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");


// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database connected successfully!');
// });



// POST /recently-viewed → Log product view
router.post('/recently-viewed', async (req, res) => {
  const { user_id, product_id } = req.body;
  const now = new Date();
  await db.query(`
    INSERT INTO recently_viewed (user_id, product_id, viewed_at)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE viewed_at = ?
  `, [user_id, product_id, now, now]);
  res.json({ message: 'Product view logged' });
});

// GET /recently-viewed/:user_id → Fetch last 6 viewed products
router.get('/recently-viewed/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const [rows] = await db.query(`
SELECT 
    p.id, 
    p.name, 
    p.image_path, 
    p.price
FROM 
    recently_viewed rv
JOIN 
    products p 
ON 
    rv.product_id = p.id;
  `, [user_id]);
  res.json(rows);
});

module.exports = router;
