const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require("./udb.cjs");

// Apply middleware globally before routes
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        console.log("file", file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
}).single('image_path');

// Get all products
router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// router.post('/', upload, (req, res) => {
//     console.log("req.body", req.body);
//     const { name, price, stock, category, discription } = req.body;
//     const image_path = req.file ? `/uploads/${req.file.filename}` : null;

//     db.query(
//         'INSERT INTO products (name, price, stock, category,  image, discription) VALUES (?, ?, ?, ?, ?, ?)',
//         [name, price, stock, category, image_path, discription],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });
//             res.json({ id: result.insertId, name, price, stock, category, image_path, discription });
//         }
//     );
// });

router.post('/', (req, res) => {
    const { date, status, totalCost, name, address, phone, paymentMethod, products } = req.body;

    const sql = `
        INSERT INTO orders (date, status, totalCost, name, address, phone, paymentMethod, products)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    console.log("req.body", req.body);

    db.query(sql, [date, status, totalCost, name, address, phone, paymentMethod, JSON.stringify(products)], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.json({ message: 'Order added successfully!', orderId: result.insertId });
    });
});

router.get('/:id', (req, res) => {
    const orderId = req.params.id;

    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('Error fetching order:', err);
            return res.status(500).json({ error: 'Database fetch error' });
        }

        if (results.length > 0) {
            const order = results[0];
            order.products = JSON.parse(order.products); // Parse the products JSON string
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    });
});

router.put('/:id', upload, (req, res) => {
    const { name, price, stock, category, discription } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : req.body.oldImagePath;
    const productId = req.params.id;

    db.query(
        'UPDATE products SET name = ?, price = ?, stock = ?, category = ?,  image = ?, discription = ? WHERE id = ?',
        [name, price, stock, category, image_path, discription, productId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            db.query('SELECT * FROM products WHERE id = ?', productId, (err, results)=>{
                if (err) return res.status(500).json({ error: err.message });
                res.json(results[0]);
            })
        }
    );
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT  image  FROM products WHERE id = ?', productId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0 && results[0].image_path) {
            const imagePath = path.join(__dirname, '..', results[0].image_path);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }
    });

    db.query('DELETE FROM products WHERE id = ?', productId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
});

module.exports = router;
