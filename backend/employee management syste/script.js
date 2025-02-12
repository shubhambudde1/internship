const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin", // Add your MySQL password if needed
    database: "EmployeeManagement",
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Route: Fetch All Employees (With Optional Filters)
app.get("/employees", (req, res) => {
    let { id, department, name } = req.query;
    
    let sql = `SELECT e.employee_id, e.name, e.email, e.position, d.name AS department, e.salary 
               FROM Employees e 
               LEFT JOIN Departments d ON e.department_id = d.department_id 
               WHERE 1=1`;

    let values = [];

    if (id) {
        sql += " AND e.employee_id = ?";
        values.push(id);
    }
    if (department) {
        sql += " AND d.name LIKE ?";
        values.push(`%${department}%`);
    }
    if (name) {
        sql += " AND e.name LIKE ?";
        values.push(`%${name}%`);
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
