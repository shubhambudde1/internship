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




// Get all return requests
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT r.*, u.name AS user_name, p.name AS product_name 
      FROM returns r
      JOIN admin_dashboard_user u ON r.user_id = u.id
      JOIN products p ON r.product_id = p.id
    `);
    res.json(results);
  } catch (err) {
    console.error('Error fetching return requests:', err);
    res.status(500).json({ error: 'Failed to fetch return requests' });
  }
});



// Get return request details
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(`SELECT * FROM returns WHERE id = ?`, [id]);
    res.json(result[0]);
  } catch (err) {
    console.error('Error fetching return request details:', err);
    res.status(500).json({ error: 'Failed to fetch return request details' });
  }
});


// Approve return
router.post('/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE returns SET status = 'Approved', reviewed_at = NOW() WHERE id = ?`, [id]);
    res.json({ message: 'Return approved' });
  } catch (err) {
    console.error('Error approving return request:', err);
    res.status(500).json({ error: 'Failed to approve return request' });
  }
});

// Reject return
router.post('/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE returns SET status = 'Rejected', reviewed_at = NOW() WHERE id = ?`, [id]);
    res.json({ message: 'Return rejected' });
  } catch (err) {
    console.error('Error rejecting return request:', err);
    res.status(500).json({ error: 'Failed to reject return request' });
  }
});

// Refund return
router.post('/:id/refund', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`UPDATE returns SET status = 'Refunded' WHERE id = ?`, [id]);
    res.json({ message: 'Return marked as refunded' });
  } catch (err) {
    console.error('Error marking return as refunded:', err);
    res.status(500).json({ error: 'Failed to mark return as refunded' });
  }
});


// Delete return request
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM returns WHERE id = ?', [id]);
    res.json({ message: 'Return request deleted successfully' });
  } catch (error) {
    console.error('Error deleting return request:', error);
    res.status(500).json({ error: 'Failed to delete return request' });
  }
});

module.exports = router;
