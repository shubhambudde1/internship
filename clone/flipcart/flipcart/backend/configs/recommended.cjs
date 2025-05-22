const express = require('express');
const router = express.Router();
const db = require("./udb.cjs")


// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database connected successfully!');
// });


// GET Recommendations for a User
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = `SELECT * FROM product_recommendations WHERE user_id = ? ORDER BY created_at DESC LIMIT 10`;
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});



// POST User Activity
router.post("/user-activity", (req, res) => {
  const { user_id, product_id, activity_type } = req.body;
  const query = `INSERT INTO user_activity (user_id, product_id, activity_type) VALUES (?, ?, ?)`;
  db.query(query, [user_id, product_id, activity_type], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Activity logged" });
  });
});


// GET Homepage Recommendations
router.get("/", (req, res) => {
  const query = `SELECT * FROM product_recommendations ORDER BY created_at DESC LIMIT 10`;
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
module.exports = router;


