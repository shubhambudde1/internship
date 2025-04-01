const express = require("express");
const router = express.Router();
const db = require("./udb.cjs");

// Fetch all products
router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new product
router.post("/", (req, res) => {
    const { name, price, stock } = req.body;
    db.query("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)", [name, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, name, price, stock });
    });
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
    const productId = req.params.id;
    db.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product deleted successfully" });
    });
});

// Update a product by ID
// Update a product by ID
router.put("/:id", (req, res) => {
    const productId = req.params.id;
    const { name, price, stock } = req.body;
  

    // Ensure all required fields are provided
    if (!name || !price || !stock) {
        return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    // Update the product in the database
    db.query(
        "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
        [name, price, stock, productId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Check if the product was updated
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.json({ id: productId, name, price, stock, message: "Product updated successfully" });
        }
    );
});

module.exports = router;
