const express = require('express');
const router = express.Router();
// Ensure you are using the promise wrapper consistently
const db = require("./udb.cjs").promise(); // Use the promise wrapper

// Get all products with specific seller details
router.get('/', async (req, res) => { // Added async
    console.log("Fetching all products with seller details...");
    try {
        // Updated SQL query to select specific fields from both tables
        const sql = `
            SELECT
                p.id AS product_id,
                p.name AS product_name,
                p.seller_id,
                p.price,
                s.id AS seller_table_id,
                s.name AS seller_name,
                s.email AS seller_email,
                s.phone AS seller_phone,
                s.company_name AS seller_company_name,
                s.status AS seller_status,
                pm.stock_quantity AS stock_quantity,
                pm.status AS product_status,
                pm.updated_at AS product_updated_at
            FROM
                products p
            LEFT JOIN
                sellers s ON p.seller_id = s.id
            LEFT JOIN
                product_manage pm ON p.id = pm.product_id;
        `;
        const [productsWithSellers] = await db.query(sql); // Use promise-based query
        res.json(productsWithSellers);
        console.log("Products with seller details fetched successfully:", productsWithSellers.length, "items found.");

    } catch (error) {
        console.error("Error fetching products with seller details:", error);
        // Send a more specific error message
        res.status(500).json({ error: 'Failed to fetch products', details: error.message });
    }
});

// Check stock availability for a product
router.get('/:id/stock', async (req, res) => {
    const productId = req.params.id;

    console.log(`Checking stock for product ID ${productId}...`);
    try {
        const [result] = await db.query(
            'SELECT stock_quantity FROM product_manage WHERE id = ?',
            [productId]
        );

        if (result.length === 0) {
            console.log(`Product ID ${productId} not found.`);
            return res.status(404).json({ error: 'Product not found' });
        }

        const stockQuantity = result[0].stock_quantity;
        const stockStatus = stockQuantity > 0 ? 'In Stock' : 'Out of Stock';

        res.json({ productId, stockQuantity, stockStatus });
        console.log(`Stock for product ID ${productId}: ${stockQuantity} (${stockStatus})`);

    } catch (error) {
        console.error(`Error checking stock for product ID ${productId}:`, error);
        res.status(500).json({ error: 'Failed to check stock', details: error.message });
    }
});

// Update stock quantity (Seems okay, uses async/await)
router.put('/:id/stock', async (req, res) => {
    const { stock_quantity } = req.body;
    const productId = req.params.id;

    // Basic validation
    if (stock_quantity === undefined || isNaN(parseInt(stock_quantity))) {
         return res.status(400).json({ error: 'Invalid or missing stock_quantity in request body.' });
    }
    const stockQtyInt = parseInt(stock_quantity);

    console.log(`Updating stock for product ID ${productId} to ${stockQtyInt}...`);
    try {
        const [result] = await db.execute( // Use execute for prepared statements
            'UPDATE product_manage SET stock_quantity = ?, status = ? WHERE id = ?',
            [stockQtyInt, stockQtyInt <= 0 ? 'Out of Stock' : 'Active', productId] // Use <= 0 for safety
        );

        if (result.affectedRows === 0) {
            console.log(`Product ID ${productId} not found for stock update.`);
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Stock updated successfully' });
        console.log(`Stock updated successfully for product ID ${productId}`);

    } catch (error) {
        console.error(`Error updating stock for product ID ${productId}:`, error);
        res.status(500).json({ error: 'Failed to update stock', details: error.message });
    }
});

// Update product status (Seems okay, uses async/await)
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    const productId = req.params.id;

    // Basic validation
    if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing status in request body.' });
    }

    console.log(`Updating status for product ID ${productId} to ${status}...`);
    try {
        const [result] = await db.execute( // Use execute
            'UPDATE product_manage SET status = ? WHERE id = ?',
            [status, productId]
        );

         if (result.affectedRows === 0) {
            console.log(`Product ID ${productId} not found for status update.`);
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Status updated successfully' });
        console.log(`Status updated successfully for product ID ${productId}`);

    } catch (error) {
        console.error(`Error updating status for product ID ${productId}:`, error);
        res.status(500).json({ error: 'Failed to update status', details: error.message });
    }
});

module.exports = router;
