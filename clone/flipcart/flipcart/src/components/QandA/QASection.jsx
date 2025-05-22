// QASection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QASection = ({ productId, userId, isAdmin }) => {
  const [questions, setQuestions] = useState([]);
  const [expandedQ, setExpandedQ] = useState(null);
  const [answerText, setAnswerText] = useState({});
  
  const fetchQA = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/QASection/questions/${productId}`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    }
  };

  useEffect(() => {
    fetchQA();
  }, [productId]);

  const handleAnswerSubmit = async (questionId) => {
    try {
      await axios.post('http://localhost:5001/api/QASection/answers', {
        question_id: questionId,
        user_id: userId,
        answer_text: answerText[questionId]
      });
      setAnswerText(prev => ({ ...prev, [questionId]: '' }));
      fetchQA();
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const handleExpand = (qid) => {
    setExpandedQ(qid === expandedQ ? null : qid);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product Q&A</h2>
      {questions.map((q) => (
        <div key={q.question_id} className="border-b py-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{q.question_text}</span>
            <button
              onClick={() => handleExpand(q.question_id)}
              className="text-blue-600 text-sm"
            >
              {expandedQ === q.question_id ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>

          {expandedQ === q.question_id && (
            <div className="ml-4 mt-2">
              {q.answers.length > 0 ? (
                q.answers.map((a) => (
                  <div key={a.answer_id} className="p-2 border rounded my-2">
                    <p><strong>{a.answer_user}</strong>: {a.answer_text}</p>
                    <div className="flex gap-3 text-sm text-gray-600 mt-1">
                      <span>👍 {a.upvotes}</span>
                      <span>👎 {a.downvotes}</span>
                      {a.is_most_helpful && (
                        <span className="text-green-600 font-semibold">Most Helpful</span>
                      )}
                      {isAdmin && (
                        <button className="text-red-500">[Delete]</button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No answers yet.</p>
              )}

              {userId && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write an answer..."
                    value={answerText[q.question_id] || ''}
                    onChange={(e) =>
                      setAnswerText({ ...answerText, [q.question_id]: e.target.value })
                    }
                    className="flex-1 border p-2 rounded"
                  />
                  <button
                    onClick={() => handleAnswerSubmit(q.question_id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Answer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QASection;
