const express = require('express');
const router = express.Router();
// Ensure you are using the promise wrapper consistently
const db = require("./udb.cjs").promise(); 


// Check database connection



// Get all customers
router.get('/', async (req, res) => {
    try {
      const [customers] = await db.query('SELECT * FROM customers');
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update customer status
  router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Active', 'Blocked'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    try {
      await db.query('UPDATE customers SET status = ? WHERE id = ?', [status, id]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update status' });
    }
  });
  
  module.exports = router;
