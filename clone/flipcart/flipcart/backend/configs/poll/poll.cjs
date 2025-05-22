const express = require('express');
const router = express.Router();
const db = require("../udb.cjs");

// Create a poll
router.post('/', (req, res) => {
  const { question, options, created_by } = req.body;
  db.query('INSERT INTO polls (question, created_by, created_at) VALUES (?, ?, NOW())',
    [question, created_by],
    (err, result) => {
      if (err) return res.status(500).send(err);
      const pollId = result.insertId;
      const values = options.map(opt => [pollId, opt]);
      db.query('INSERT INTO poll_options (poll_id, option_text) VALUES ?', [values], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ pollId });
      });
    });
});

// Get all polls
router.get('/', (req, res) => {
  db.query('SELECT * FROM polls', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Get a poll with options
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM polls WHERE id=?', [id], (err, pollResult) => {
    if (err) return res.status(500).send(err);
    db.query('SELECT * FROM poll_options WHERE poll_id=?', [id], (err, optionsResult) => {
      if (err) return res.status(500).send(err);
      res.send({ poll: pollResult[0], options: optionsResult });
    });
  });
});

// Vote on a poll
router.post('/:id/vote', (req, res) => {
  const { option_id, user_id } = req.body;
  const { id } = req.params;
  db.query('INSERT INTO poll_votes (user_id, poll_id, option_id, voted_at) VALUES (?, ?, ?, NOW())',
    [user_id, id, option_id], (err) => {
      if (err) return res.status(500).send(err);
      db.query('UPDATE poll_options SET vote_count = vote_count + 1 WHERE id=?',
        [option_id], (err) => {
          if (err) return res.status(500).send(err);
          res.send({ message: 'Voted successfully!' });
        });
    });
});

// Get results
router.get('/:id/results', (req, res) => {
  const { id } = req.params;
  db.query('SELECT option_text, vote_count FROM poll_options WHERE poll_id=?', [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
});


module.exports = router;
