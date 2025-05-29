import React, { useState } from 'react';

const rules = [
  {
    keywords: ['price', 'cost', 'rate'],
    answer: 'Our products are competitively priced. Check individual product pages for details.',
  },
  {
    keywords: ['shipping', 'delivery'],
    answer: 'We offer free shipping on orders above ₹499. Delivery usually takes 2-5 days.',
  },
  {
    keywords: ['return', 'refund'],
    answer: 'You can return eligible items within 7 days of delivery.',
  },
  {
    keywords: ['payment', 'pay', 'upi'],
    answer: 'We accept UPI, cards, net banking, and cash on delivery.',
  },
  {
    keywords: ['hi', 'hello'],
    answer: 'Hello! How can I assist you today?',
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! Ask me about shipping, pricing, returns, or payment options.',
    },
  ]);

  const toggleChat = () => setOpen(!open);

  const getResponse = (msg) => {
    const lower = msg.toLowerCase();
    for (let rule of rules) {
      if (rule.keywords.some((kw) => lower.includes(kw))) {
        return rule.answer;
      }
    }
    return "Sorry, I didn't get that. Please ask about shipping, price, return, or payment.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const botMsg = { sender: 'bot', text: getResponse(input) };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open ? (
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md"
        >
          Chat with us
        </button>
      ) : (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col border border-gray-300">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold">Shopping Assistant</h3>
            <button onClick={toggleChat}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 ml-auto text-right'
                    : 'bg-gray-200 text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-1 text-sm border rounded"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
