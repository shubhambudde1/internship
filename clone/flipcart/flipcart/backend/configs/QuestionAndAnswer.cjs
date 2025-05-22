const express = require('express');
const router = express.Router();
const db = require("./udb.cjs");



// db.connect(err => {
//   if (err) throw err;
//   console.log('✅ Connected to MySQL');
// });



router.get('/questions', async (req, res) => {
    try {
      const [products] = await db.query('SELECT * FROM product_questions');
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.get('/answers', async (req, res) => {
    try {
      const [products] = await db.query('SELECT * FROM product_answers');
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });



// 🔹 POST /questions - Submit a question
router.post('/questions', (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming request body
  const { product_id, user_id, question_text } = req.body;

  const sql = 'INSERT INTO product_questions (product_id, user_id, question_text) VALUES (?, ?, ?)';
  db.query(sql, [product_id, user_id, question_text], (err, result) => {
    if (err) {
      console.error('Database Error:', err); // Log database errors
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.json({ message: 'Question submitted', question_id: result.insertId });
  });
});




// f🔹 POST /answers - Submit an answer
router.post('/answers', (req, res) => {
  const { question_id, user_id, answer_text } = req.body;
  const sql = 'INSERT INTO product_answers (question_id, user_id, answer_text) VALUES (?, ?, ?)';
  db.query(sql, [question_id, user_id, answer_text], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Answer submitted', answer_id: result.insertId });
  });
});

// 🔹 GET /questions/:product_id - Fetch questions + answers for a product
router.get('/questions/:product_id', (req, res) => {
  const productId = req.params.product_id;

  const sql = `
    SELECT 
      q.id AS question_id,
      q.question_text,
      q.created_at AS question_time,
      u.name AS question_user,
      a.id AS answer_id,
      a.answer_text,
      a.created_at AS answer_time,
      ua.name AS answer_user,
      a.upvotes,
      a.downvotes,
      a.is_most_helpful
    FROM product_questions q
    JOIN users u ON q.user_id = u.id
    LEFT JOIN product_answers a ON a.question_id = q.id
    LEFT JOIN users ua ON a.user_id = ua.id
    WHERE q.product_id = ?
    ORDER BY q.created_at DESC, a.upvotes DESC;
  `;

  db.query(sql, [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const questionsMap = {};

    results.forEach(row => {
      if (!questionsMap[row.question_id]) {
        questionsMap[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          question_time: row.question_time,
          question_user: row.question_user,
          answers: []
        };
      }

      if (row.answer_id) {
        questionsMap[row.question_id].answers.push({
          answer_id: row.answer_id,
          answer_text: row.answer_text,
          answer_time: row.answer_time,
          answer_user: row.answer_user,
          upvotes: row.upvotes,
          downvotes: row.downvotes,
          is_most_helpful: row.is_most_helpful
        });
      }
    });

    res.json(Object.values(questionsMap));
  });
});


module.exports = router;
