const express = require('express');
const router = express.Router();
const db = require("./udb.cjs"); // Your database connection module
// const moment = require('moment'); // No longer needed if using DB default timestamp

// --- Remove Redundant Connection ---
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         return;
//     }
//     console.log('Database (returns) connected successfully!');
// });

// --- API Endpoints ---

// POST /api/returnr -> Create a new return request
// Adjusted to match the specified database fields for input
router.post('/', (req, res) => {
    // Expect these fields based on the database schema (excluding auto/default fields)
    // Using camelCase for JS variables, mapping to snake_case in SQL
    const { order_id, productName, reason, customer_name } = req.body;
    console.log("Received request body for return:", req.body);

    // Validate required fields (customer_name might be optional/nullable in DB)
    // if (!order_id || !productName || !reason) {
    //     // customer_name might be allowed to be null, so not strictly validated here
    //     return res.status(400).json({ message: 'Missing required fields: order_id, productName, reason' });
    // }

    // SQL query targeting only the necessary columns
    // Let the database handle 'id' (AUTO_INCREMENT), 'status' (DEFAULT 'Pending'),
    // and 'request_date' (DEFAULT CURRENT_TIMESTAMP)
    const query = 'INSERT INTO return_requests (order_id, product_name, reason, customer_name) VALUES (?, ?, ?, ?)';

    // Map JS variables to SQL columns
    const values = [
        order_id,
        productName, // Assuming frontend sends productName, mapping to product_name column
        reason,
        customer_name || null // Use provided customer_name or explicitly set to null if not provided/empty
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error creating return request:', err);
            return res.status(500).json({ message: 'Failed to create return request.', error: err.message });
        }
        // Respond with the ID of the newly created request
        res.status(201).json({ message: 'Return request submitted successfully.', requestId: result.insertId });
    });
});


// GET /api/returnr -> Get all return requests (For Admin)
router.get('/', (req, res) => {
    const query = 'SELECT id, order_id, product_name, reason, status, request_date, customer_name FROM return_requests ORDER BY request_date DESC'; // Explicitly select columns

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching return requests:', err);
            return res.status(500).json({ message: 'Failed to fetch return requests.', error: err.message });
        }
        res.status(200).json(results);
         console.log(results);
    });
});

// GET /api/returnr/:id -> Get details of a specific return request (Optional)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, order_id, product_name, reason, status, request_date, customer_name FROM return_requests WHERE id = ?'; // Explicitly select columns

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

// PUT /api/returnr/:id/approve -> Approve a return request (For Admin)
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
        // Fetch the updated record to send back
        db.query('SELECT id, order_id, product_name, reason, status, request_date, customer_name FROM return_requests WHERE id = ?', [id], (err, updatedResult) => {
             if (err) return res.status(500).json({ message: 'Approved, but failed to fetch updated record.', error: err.message });
             if (updatedResult.length === 0) return res.status(404).json({ message: 'Approved, but failed to fetch updated record (not found).' });
             res.status(200).json({ message: 'Return request approved successfully.', request: updatedResult[0] });
        });
    });
});

// PUT /api/returnr/:id/reject -> Reject a return request (For Admin)
router.put('/:id/reject', (req, res) => {
    const { id } = req.params;
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
         // Fetch the updated record to send back
        db.query('SELECT id, order_id, product_name, reason, status, request_date, customer_name FROM return_requests WHERE id = ?', [id], (err, updatedResult) => {
             if (err) return res.status(500).json({ message: 'Rejected, but failed to fetch updated record.', error: err.message });
             if (updatedResult.length === 0) return res.status(404).json({ message: 'Rejected, but failed to fetch updated record (not found).' });
             res.status(200).json({ message: 'Return request rejected successfully.', request: updatedResult[0] });
        });
    });
});

// Make sure the router is exported
module.exports = router;
