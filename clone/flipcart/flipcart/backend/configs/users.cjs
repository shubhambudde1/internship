const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../configs/udb.cjs");

// Fetch all users
router.get("/", (req, res) => {
    db.query("SELECT id, name, email, role FROM admin_dashboard_user", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new user
router.post("/", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, Email, and Password are required" });
    }

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO admin_dashboard_user (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role || "user"],
            (err, result) => {
                if (err) {
                    console.error("Database Error:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ id: result.insertId, name, email, role });
            }
        );
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM admin_dashboard_user WHERE id = ?", [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted successfully" });
    });
});

module.exports = router;
