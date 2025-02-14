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
  database: "employee_management",
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to MySQL");
});

// Add Employee
app.post("/employees", (req, res) => {
  const { name, email, position, salary } = req.body;
  db.query(
    "INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)",
    [name, email, position, salary],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Employee Added", id: result.insertId });
    }
  );
});

// Get All Employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Update Employee
app.put("/employees/:id", (req, res) => {
  const { name, email, position, salary } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE employees SET name=?, email=?, position=?, salary=? WHERE id=?",
    [name, email, position, salary, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Employee Updated" });
    }
  );
});

// Delete Employee
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee Deleted" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
