const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");





router.get('/', (req, res) => {
    const query = 'SELECT * FROM notifications ORDER BY created_at DESC';
    db.execute(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);                  
    });
});                         


       

// Mark notification as read
router.put('/:id/read', (req, res) => {
  const query = 'UPDATE notifications SET is_read = 1 WHERE id = ?';
  db.execute(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Marked as read' });
  });
});


module.exports = router;