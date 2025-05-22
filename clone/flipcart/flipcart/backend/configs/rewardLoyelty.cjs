const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");
const moment = require('moment');
const date = moment().format('YYYY-MM-DD HH:mm:ss');



// Check database connection
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database  rewardLowelty connected successfully!');
// });


router.post('/', (req, res) => {
    const { user_id, type, points, description } = req.body;
    console.log('Received data:', req.body); // Log the received data for debugging

    // Define the date variable
    const date = new Date(); // Use JavaScript's built-in Date object

    const sql = 'INSERT INTO loyalty_transactions (created_at, user_id, type, points, description) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [date, user_id, type, points, description], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: 'Database insert error' });
        }
        res.send({ message: 'Loyalty transaction added successfully!', transactionId: result.insertId });
    });
});


  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM loyalty_transactions';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error retrieving data:', err);
        return res.status(500).send({ message: 'Database retrieval error' });
      }
      res.send(result);
    });
  });




module.exports = router;
