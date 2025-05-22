const express = require("express");
const router = express.Router();
const db = require("./udb.cjs");

// db.connect(err => {
//   if (err) {
//     console.error('MySQL connection failed:', err);
//   } else {
//     console.log('Connected to order return MySQL database.');
//   }
// });

// POST route to handle return requests
router.post("/", (req, res) => {
  const { order_id, product_name, reason, status } = req.body;
  console.log("Received return request:", req.body);

  if (!order_id || !product_name || !reason) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const sql = "INSERT INTO returns (order_id, product_name, reason, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [order_id, product_name, reason, status], (err, result) => {
    if (err) {
      console.error("Error inserting return request:", err);
      return res.status(500).send({ message: "Database insert error" });
    }
    res.send({ message: "Return request submitted successfully!", returnId: result.insertId });
  });
});

// GET route to retrieve all return requests
router.get("/", (req, res) => {
  const sql = "SELECT * FROM returns";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving return requests:", err);
      return res.status(500).send({ message: "Database retrieval error" });
    }
    res.send(result);
  });
});

// PUT route to approve a return request
router.put("/:id/approve", (req, res) => {
  const { id } = req.params;
    console.log("Approving return request with ID:", id);
  const sql = "UPDATE returns SET status = 'Approved' WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error approving return request with ID ${id}:`, err);
      return res.status(500).send({ message: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Return request not found" });
    }
    res.send({ message: `Return request #${id} approved successfully!` });
  });
});

// PUT route to reject a return request
router.put("/:id/reject", (req, res) => {
  const { id } = req.params;
    console.log("Rejecting return request with ID:", id);
  const sql = "UPDATE returns SET status = 'Rejected' WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(`Error rejecting return request with ID ${id}:`, err);
      return res.status(500).send({ message: "Database update error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Return request not found" });
    }
    res.send({ message: `Return request #${id} rejected successfully!` });
  });
});

module.exports = router;