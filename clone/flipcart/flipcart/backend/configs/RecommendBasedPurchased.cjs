// routes/recommendations.js
const express = require('express');
const router = express.Router();
const db = require('./udb.cjs'); // MySQL connection


// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database connected recommended successfully!');
// });


// Get recommendations based on category
router.get('/:category', async (req, res) => {
    const { category } = req.params;
    try {
      const [rows] = await db.promise().query(
        'SELECT * FROM products WHERE category = ? ORDER BY RAND() LIMIT 10',
        [category]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  });



module.exports = router;
