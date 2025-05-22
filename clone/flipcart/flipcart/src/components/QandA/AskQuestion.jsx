// AskQuestion.js
import React, { useState } from 'react';
import axios from 'axios';

const AskQuestion = ({ productId, userId, onQuestionAdded }) => {
  const [questionText, setQuestionText] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    try {
      await axios.post('http://localhost:5001/api/QASection/questions', {
        product_id: productId,
        user_id: userId,
        question_text: questionText
      });
      setQuestionText('');
      onQuestionAdded(); // refresh list
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };
  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Ask a Question</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ask
        </button>
      </form>
    </div>
  );
};



export default AskQuestion;
