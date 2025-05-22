const express = require('express');
const router = express.Router();
const db = require("./udb.cjs").promise(); // Use promise wrapper for MySQL connection

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to user MySQL database.');
  }
});


// Fetch all users
router.get('/', (req, res) => {
    const sql = 'SELECT id, name, email, role FROM users'; // Specify columns to fetch
    db.query(sql)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.json(rows);
        })
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).json({ message: 'Failed to retrieve users' });
        });
  });




  
  // ✅ SIGNUP API
  router.post('/signup', (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Signup request body:', req.body); // Debug: Log request body
  
    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email])
        .then(([results]) => {
            if (results.length > 0) {
                console.log('Email already registered:', email);
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Insert user
            const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
            return db.query(insertQuery, [name, email, password, role]);
        })
        .then(([result]) => {
            console.log('User signup successful:', result);
            return res.status(201).json({
                message: 'Signup successful',
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role,
                },
            });
        })
        .catch(err => {
            console.error('Error during signup:', err);
            return res.status(500).json({ message: 'Signup failed', error: err.message });
        });
});

// ✅ LOGIN API
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login request body:', req.body);

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password])
        .then(([results]) => {
            if (results.length > 0) {
                const user = results[0];
                console.log('Login successful for user:', user);
                return res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                });
            } else {
                console.log('Invalid email or password for:', email);
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        })
        .catch(err => {
            console.error('Error during login query:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        });
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    const fields = [];
    const params = [];

    if (name) { fields.push('name = ?'); params.push(name); }
    if (email) { fields.push('email = ?'); params.push(email); }
    if (password) { fields.push('password = ?'); params.push(password); }
    if (role) { fields.push('role = ?'); params.push(role); }

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    params.push(userId);

    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    db.query(sql, params)
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        })
        .catch(err => {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        });
});

// // Add a new user
// router.post("/", async (req, res) => {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//         return res.status(400).json({ error: "Name, Email, and Password are required" });
//     }

//     try {
//         // Hash the password before saving it
//         const hashedPassword = await bcrypt.hash(password, 10);

//         db.query(
//             "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//             [name, email, hashedPassword, role || "user"],
//             (err, result) => {
//                 if (err) {
//                     console.error("Database Error:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 res.status(201).json({ id: result.insertId, name, email, role });
//             }
//         );
//     } catch (err) {
//         console.error("Error hashing password:", err);
//         res.status(500).json({ error: "Server error" });
//     }
// });
module.exports = router;
