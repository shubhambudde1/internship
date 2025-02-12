// Required dependencies
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: `librarymanagement`
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(cors());
app.use(express.json());

// Get all books with author details
app.get('/api/books', (req, res) => {
    const sql = `
        SELECT b.*, CONCAT(a.first_name, ' ', a.last_name) as author_name 
        FROM Books b 
        JOIN Authors a ON b.author_id = a.author_id
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get all authors
app.get('/api/authors', (req, res) => {
    const sql = 'SELECT * FROM Authors';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get all members
app.get('/api/members', (req, res) => {
    const sql = 'SELECT * FROM Members';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get borrowed books with details
app.get('/api/borrowed', (req, res) => {
    const sql = `
        SELECT bb.*, b.title as book_title, 
        CONCAT(m.first_name, ' ', m.last_name) as member_name
        FROM BorrowedBooks bb
        JOIN Books b ON bb.book_id = b.book_id
        JOIN Members m ON bb.member_id = m.member_id
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add new book
app.post('/api/books', (req, res) => {
    const { title, author_id, isbn, publication_year, copies_available, total_copies } = req.body;
    const sql = 'INSERT INTO Books SET ?';
    db.query(sql, { title, author_id, isbn, publication_year, copies_available, total_copies }, 
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Book added successfully', id: result.insertId });
    });
});

// Add new member
app.post('/api/members', (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    const sql = 'INSERT INTO Members SET ?';
    db.query(sql, { first_name, last_name, email, phone }, 
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Member added successfully', id: result.insertId });
    });
});

// Issue a book
app.post('/api/borrow', (req, res) => {
    const { book_id, member_id, due_date } = req.body;
    
    // Start transaction
    db.beginTransaction(err => {
        if (err) throw err;

        // Insert borrow record
        const borrowSql = 'INSERT INTO BorrowedBooks SET ?';
        db.query(borrowSql, { book_id, member_id, due_date }, (err, result) => {
            if (err) {
                return db.rollback(() => { throw err; });
            }

            // Update book availability
            const updateSql = `
                UPDATE Books 
                SET copies_available = copies_available - 1,
                    status = CASE 
                        WHEN copies_available - 1 = 0 THEN 'Not Available'
                        ELSE 'Available'
                    END
                WHERE book_id = ?
            `;
            
            db.query(updateSql, [book_id], (err, result) => {
                if (err) {
                    return db.rollback(() => { throw err; });
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => { throw err; });
                    }
                    res.json({ message: 'Book issued successfully' });
                });
            });
        });
    });
});

// Return a book
app.put('/api/return/:id', (req, res) => {
    const borrow_id = req.params.id;
    
    // Start transaction
    db.beginTransaction(err => {
        if (err) throw err;

        // Update borrow record
        const updateBorrowSql = `
            UPDATE BorrowedBooks 
            SET return_date = CURRENT_DATE, status = 'Returned'
            WHERE borrow_id = ?
        `;
        
        db.query(updateBorrowSql, [borrow_id], (err, result) => {
            if (err) {
                return db.rollback(() => { throw err; });
            }

            // Get book_id from borrow record
            db.query('SELECT book_id FROM BorrowedBooks WHERE borrow_id = ?', 
                [borrow_id], (err, results) => {
                    if (err) {
                        return db.rollback(() => { throw err; });
                    }

                    const book_id = results[0].book_id;

                    // Update book availability
                    const updateBookSql = `
                        UPDATE Books 
                        SET copies_available = copies_available + 1,
                            status = 'Available'
                        WHERE book_id = ?
                    `;
                    
                    db.query(updateBookSql, [book_id], (err, result) => {
                        if (err) {
                            return db.rollback(() => { throw err; });
                        }

                        db.commit(err => {
                            if (err) {
                                return db.rollback(() => { throw err; });
                            }
                            res.json({ message: 'Book returned successfully' });
                        });
                    });
            });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});