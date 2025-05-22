import React, { useState } from 'react';

function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          created_by: 'user', // Replace with actual user ID
          options,
        }),
      });
      if (response.ok) {
        console.log('Poll created successfully');
        // Reset form
        setQuestion('');
        setOptions(['', '']);
      } else {
        console.error('Error creating poll');
      }
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div className="create-poll">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={question} onChange={handleQuestionChange} />
        </label>
        <br />
        <label>
          Options:
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
              />
              <button type="button" onClick={() => removeOption(index)}>
                Remove
              </button>
            </div>
          ))}
        </label>
        <button type="button" onClick={addOption}>
          Add Option
        </button>
        <br />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}

export default CreatePoll;
