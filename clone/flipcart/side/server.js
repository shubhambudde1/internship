import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API endpoints


// GET /polls - Get all polls
app.get('/polls', (req, res) => {
  db.query('SELECT * FROM polls', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching polls');
      return;
    }
    res.json(results);
  });
});


// GET /polls/:id - Get poll with options and votes
app.get('/polls/:id', (req, res) => {
  const pollId = req.params.id;
  db.query('SELECT * FROM polls WHERE id = ?', [pollId], (err, poll) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching poll');
      return;
    }
    if (poll.length === 0) {
      res.status(404).send('Poll not found');
      return;
    }
    db.query('SELECT * FROM poll_options WHERE poll_id = ?', [pollId], (err, options) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching poll options');
        return;
      }
      res.json({ ...poll[0], options });
    });
  });
});




// POST /polls - Create a new poll
app.post('/polls', (req, res) => {
  const { question, created_by, options } = req.body;
  const created_at = new Date();
  db.query('INSERT INTO polls (question, created_by, created_at) VALUES (?, ?, ?)', [question, created_by, created_at], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating poll');
      return;
    }
    const pollId = result.insertId;
    options.forEach(option => {
      db.query('INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)', [pollId, option], (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error creating poll option');
          return;
        }
      });
    });
    res.status(201).send({ id: pollId, message: 'Poll created successfully' });
  });
});


// POST /polls/:id/vote - Vote on a poll
app.post('/polls/:id/vote', (req, res) => {
  const pollId = req.params.id;
  const { option_id, user_id } = req.body;
  const voted_at = new Date();
  db.query('INSERT INTO poll_votes (poll_id, option_id, user_id, voted_at) VALUES (?, ?, ?, ?)', [pollId, option_id, user_id, voted_at], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error voting on poll');
      return;
    }
    db.query('UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = ?', [option_id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating vote count');
        return;
      }
      res.status(200).send('Vote recorded successfully');
    });
  });
});

// GET /polls/:id/results - Get vote results
app.get('/polls/:id/results', (req, res) => {
  const pollId = req.params.id;
  db.query('SELECT option_text, vote_count FROM poll_options WHERE poll_id = ?', [pollId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching poll results');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
