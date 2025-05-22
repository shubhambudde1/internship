const express = require('express');
const router = express.Router();
const db = require("./udb.cjs"); // Your database connection module
// const moment = require('moment'); // No longer needed if using DB de


// GET /api/sellers -> List all sellers
router.get('/', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM sellers');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  // PUT /api/sellers/:id/approve - Approve a seller
  router.put('/:id/approve', async (req, res) => {
    try {
      const [result] = await db.promise().query(
        'UPDATE sellers SET status = ? WHERE id = ? AND status = ?', // Corrected the query
        ['Approved', req.params.id, 'Pending']
      );
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Invalid action or seller not found' });
      }
      res.json({ message: 'Seller approved' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // PUT /api/sellers/:id/block - Block a seller
  router.put('/:id/block', async (req, res) => {
    try {
      const [result] = await db.promise().query(
        'UPDATE sellers SET status = ? WHERE id = ? AND status = ?', // Corrected the query
        ['Blocked', req.params.id, 'Approved']
      );
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Invalid action or seller not found' });
      }
      res.json({ message: 'Seller blocked' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // PUT /api/sellers/:id/unblock - Unblock a seller
  router.put('/:id/unblock', async (req, res) => {
    try {
      const [result] = await db.promise().query(
        'UPDATE sellers SET status = ? WHERE id = ? AND status = ?', // Corrected the query
        ['Approved', req.params.id, 'Blocked']
      );
      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Invalid action or seller not found' });
      }
      res.json({ message: 'Seller unblocked' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // (Optional) GET /api/sellers/:id - Seller details
  router.get('/:id', async (req, res) => {
    try {
      const [rows] = await db.promise().query('SELECT * FROM sellers WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Seller not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  module.exports = router;
