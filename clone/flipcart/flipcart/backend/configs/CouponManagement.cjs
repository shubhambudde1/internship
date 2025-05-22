const express = require('express');
const router = express.Router();
// Ensure you are using the promise wrapper consistently
const db = require("./udb.cjs").promise(); 

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to COUPONS MySQL database.');
  }
});


router.get("/", async (req, res) => {
  try {
    console.log("Fetching all coupons...");
    const [results] = await db.query("SELECT * FROM coupons");
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
  });

  
  router.post("/", (req, res) => {
    const { code, discount_type, discount_value, min_order_amount, expiry_date } = req.body;
    const sql = `INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, expiry_date, status)
                 VALUES (?, ?, ?, ?, ?, 'ACTIVE')`;
    db.query(sql, [code, discount_type, discount_value, min_order_amount, expiry_date], (err) => {
      if (err) return res.status(500).send(err);
      res.send("Coupon created");
    });
  });
  
  
  router.put("/:id", (req, res) => {
    const { code, discount_type, discount_value, min_order_amount, expiry_date } = req.body;
    const sql = `UPDATE coupons SET code=?, discount_type=?, discount_value=?, min_order_amount=?, expiry_date=? WHERE id=?`;
    db.query(sql, [code, discount_type, discount_value, min_order_amount, expiry_date, req.params.id], (err) => {
      if (err) return res.status(500).send(err);
      res.send("Coupon updated");
    });
  });
  
  router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    try {
        // Toggle the status
        const [coupon] = await db.query('SELECT status FROM coupons WHERE id = ?', [id]);
        const newStatus = coupon[0].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        await db.query('UPDATE coupons SET status = ? WHERE id = ?', [newStatus, id]);

        res.json({ message: 'Status updated successfully', status: newStatus });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

  module.exports = router;
