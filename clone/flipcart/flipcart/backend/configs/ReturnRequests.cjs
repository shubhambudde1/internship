const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");
const moment = require('moment');

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database (returns)connected successfully!');
});

// Middleware to parse JSON bodies (already included globally in server.cjs, but good practice)
// router.use(express.json());

// --- API Endpoints ---

// POST /api/return -> Create a new return request (Likely initiated by a user)
// Although not explicitly requested for the *admin* part, it's needed for the system.
router.post('/', (req, res) => {
    const { order_id, productID, productName, reason,customer_name,date,reviews } = req.body;
    console.log(req.body);

    if (!order_id || !productID || !productName || !reason || !customer_name || !date || !reviews) {
        return res.status(400).json({ message: 'Missing required fields: order_id, productID, productName, reason, customer_name, date, reviews' });
    }

    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

    const query = 'INSERT INTO return_requests (order_id, productID, productName, reason, status, request_date, customer_name,reviews) VALUES (?, ?, ?, ?, ?,?,?,?)';
    const values = [
        order_id,
        productID,
        productName,
        reason,
        'Pending',
        formattedDate,
        customer_name,JSON.stringify(reviews)]; // Default status is Pending

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating return request:', err);
            return res.status(500).json({ message: 'Failed to create return request.', error: err.message });
        }
        res.status(201).json({ message: 'Return request submitted successfully.', requestId: result.insertId });
    });
});


// GET /api/return -> Get all return requests (For Admin)
router.get('/', (req, res) => {
    // Optional: Join with orders or users table if needed later
    const query = 'SELECT * FROM return_requests ORDER BY request_date DESC'; // Show newest first

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching return requests:', err);
            return res.status(500).json({ message: 'Failed to fetch return requests.', error: err.message });
        }
        res.status(200).json(results);
    });
});

// GET /api/return/:id -> Get details of a specific return request (Optional)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM return_requests WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(`Error fetching return request ${id}:`, err);
            return res.status(500).json({ message: 'Failed to fetch return request details.', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Return request not found.' });
        }
        res.status(200).json(results[0]);
    });
});

// PUT /api/return/:id/approve -> Approve a return request (For Admin)
router.put('/:id/approve', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE return_requests SET status = ? WHERE id = ?';
    const values = ['Approved', id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(`Error approving return request ${id}:`, err);
            return res.status(500).json({ message: 'Failed to approve return request.', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Return request not found or already processed.' });
        }
        // Fetch the updated record to send back (optional but good practice)
        db.query('SELECT * FROM return_requests WHERE id = ?', [id], (err, updatedResult) => {
             if (err) return res.status(500).json({ message: 'Approved, but failed to fetch updated record.', error: err.message });
             res.status(200).json({ message: 'Return request approved successfully.', request: updatedResult[0] });
        });
    });
});

// PUT /api/return/:id/reject -> Reject a return request (For Admin)
router.put('/:id/reject', (req, res) => {
    const { id } = req.params;
    // Optional: Could add a reason for rejection from req.body
    // const { rejection_reason } = req.body;
    const query = 'UPDATE return_requests SET status = ? WHERE id = ?';
    const values = ['Rejected', id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(`Error rejecting return request ${id}:`, err);
            return res.status(500).json({ message: 'Failed to reject return request.', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Return request not found or already processed.' });
        }
         // Fetch the updated record to send back (optional but good practice)
        db.query('SELECT * FROM return_requests WHERE id = ?', [id], (err, updatedResult) => {
             if (err) return res.status(500).json({ message: 'Rejected, but failed to fetch updated record.', error: err.message });
             res.status(200).json({ message: 'Return request rejected successfully.', request: updatedResult[0] });
        });
    });
});

module.exports = router;
