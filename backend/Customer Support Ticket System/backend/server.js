require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "support_system",
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL");
});

// Create a new ticket
app.post("/tickets", (req, res) => {
  const { subject, description } = req.body;
  db.query("INSERT INTO tickets (subject, description) VALUES (?, ?)", 
  [subject, description], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Ticket created", id: result.insertId });
  });
});

// Fetch all tickets
app.get("/tickets", (req, res) => {
  db.query("SELECT * FROM tickets", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Fetch single ticket by ID
app.get("/tickets/:id", (req, res) => {
  db.query("SELECT * FROM tickets WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// Update a ticket
app.put("/tickets/:id", (req, res) => {
  const { subject, description, status } = req.body;
  db.query(
    "UPDATE tickets SET subject=?, description=?, status=? WHERE id=?",
    [subject, description, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Ticket updated" });
    }
  );
});

// Delete a ticket
app.delete("/tickets/:id", (req, res) => {
  db.query("DELETE FROM tickets WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Ticket deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
