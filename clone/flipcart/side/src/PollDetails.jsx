import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PollDetails() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedOption, setSelectedOption] = useState(null);


  const fetchPoll = async () => {
    try {
      const response = await fetch(`http://localhost:3000/polls/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPoll(data);
      } else { 
        console.error('Error fetching poll');
      }
    } catch (error) {
      console.error('Error fetching poll:', error);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value));
    console.log('Selected option:', e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/polls/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          option_id: selectedOption,
          user_id: 'user', // Replace with actual user ID
        }),
      });
 
      if (response.ok) {
        console.log('Vote recorded successfully');
        console.log('Response:', await response.json());
        // Redirect to the poll list page
        navigate('/polls'); // Corrected typo here
      } else {
        console.error('Error voting on poll');
      }
    } catch (error) {
      console.error('Error voting on poll:', error);
    }
  };

  if (!poll) {
    return <p>Loading...</p>;
  }

  return (
    <div className="poll-details">
      <h2>{poll.question}</h2>
      
      <form onSubmit={handleSubmit}>
        {poll.options.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
              {option.option_text}
            </label>
          </div>
        ))}
        <Link to="/polls">
        <button type="submit">Vote</button>
        </Link>
      </form>
    </div>
  );
}

export default PollDetails;
