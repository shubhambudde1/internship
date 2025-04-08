const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require("./udb.cjs");
// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        console.log("file",file)
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
    console.log("req.body",req.body)
    const { name, price, stock, category } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    db.query(
        'INSERT INTO products (name, price, stock, category, image_path) VALUES (?, ?, ?, ?, ?)',
        [name, price, stock, category, image_path],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, name, price, stock, category, image_path });
        }
    );
});

router.put('/:id', upload, (req, res) => {
    const { name, price, stock, category } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : req.body.oldImagePath;
    const productId = req.params.id;

    db.query(
        'UPDATE products SET name = ?, price = ?, stock = ?, category = ?, image_path = ? WHERE id = ?',
        [name, price, stock, category, image_path, productId],
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
    db.query('DELETE FROM products WHERE id = ?', productId, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
});



module.exports = router;
