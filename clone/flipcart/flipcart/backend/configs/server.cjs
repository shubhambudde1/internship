const express = require("express");
const cors = require("cors");
const db = require("./udb.cjs"); // Ensure this file exists and exports required functionality
const userRoutes = require("./users.cjs"); // Ensure this file exists and exports a router
const productRoutes = require("./products.cjs"); // Ensure this file exists and exports a router
const authRoutes = require("./auth.cjs"); // Ensure this file exists and exports a router

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// User management routes
app.use("/api/users", userRoutes);

// Product management routes
app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

// Root route for testing
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start server
const PORT = 5001;
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error("Error starting the server:", error);
}
