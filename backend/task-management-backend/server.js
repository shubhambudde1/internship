const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'task_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// POST /tasks → Add a new task
app.post('/tasks', (req, res) => {
    const { title, description, status, due_date } = req.body;
    const query = 'INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, status, due_date], (err, result) => {
        if (err) {
            res.status(500).send('Error adding task');
            return;
        }
        res.status(201).send({ id: result.insertId, title, description, status, due_date });
    });
});

// GET /tasks → Fetch all tasks
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching tasks');
            return;
        }
        res.status(200).json(results);
    });
});

// PUT /tasks/:id → Update task details
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?';
    db.query(query, [title, description, status, due_date, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating task');
            return;
        }
        res.status(200).send({ id, title, description, status, due_date });
    });
});

// DELETE /tasks/:id → Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting task');
            return;
        }
        res.status(200).send({ id });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
