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

router.post('/', upload, (req, res) => {
    console.log("req.body", req.body);
    const { name, price, stock, category, discription } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    db.query(
        'INSERT INTO products (name, price, stock, category, image_path, discription) VALUES (?, ?, ?, ?, ?, ?)',
        [name, price, stock, category, image_path, discription],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, name, price, stock, category, image_path, discription });
        }
    );
});

router.put('/:id', upload, (req, res) => {
    const { name, price, stock, category, discription } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : req.body.oldImagePath;
    const productId = req.params.id;

    db.query(
        'UPDATE products SET name = ?, price = ?, stock = ?, category = ?, image_path = ?, discription = ? WHERE id = ?',
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
    db.query('SELECT image_path FROM products WHERE id = ?', productId, (err, results) => {
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
