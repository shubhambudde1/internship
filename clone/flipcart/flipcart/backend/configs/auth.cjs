const express = require("express");
const router = express.Router();
const db = require("./udb.cjs");
const axios = require("axios");

// User Login
router.post("/login", (req, res) => {
  console.log("Login API hit");

  axios
    .post("http://localhost:5001/api/auth/login", {
      email: req.body.email,
      password: req.body.password,
    })
    .then((response) => {
      const { user } = response.data;
      res.json({ user });
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Server error" });
    });
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Find user by email
  db.query("SELECT * FROM admin_dashboard_user WHERE email = ? AND password = ?", [email, password])
  .then(([results]) => {
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    // Send response with role-based redirection
    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      redirectTo: user.role === "admin" ? "/admin" : "/",
    });
  })
  .catch(err => {
    console.error("Login failed:", err);
    return res.status(500).json({ message: "Login failed" });
  });
});

module.exports = router;
