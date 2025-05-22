import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PollList() {
  const [polls, setPolls] = useState([]);





  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:3000/polls');
        if (response.ok) {
          const data = await response.json();
          // Fetch options and votes for each poll
          const pollsWithOptions = await Promise.all(
            data.map(async (poll) => {
              const optionsResponse = await fetch(`http://localhost:3000/polls/${poll.id}/results`);
              if (optionsResponse.ok) {
                const optionsData = await optionsResponse.json();
                return { ...poll, options: optionsData };
              } else {
                console.error('Error fetching poll options');
                return { ...poll, options: [] };
              }
            })
          );
          setPolls(pollsWithOptions);
        } else {
          console.error('Error fetching polls');
        }
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="poll-list flex flex-col items-center p-4"> {/* Added flex classes */}
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Poll List</h2> {/* Added styling */}
      <ul className="w-full max-w-md"> {/* Added width constraints */}
        {polls.map((poll) => (
          <li key={poll.id} className="mb-4 p-3 border rounded shadow"> {/* Added styling */}
            <Link to={`/polls/${poll.id}`} className="text-lg font-semibold text-blue-600 hover:underline">{poll.question}</Link>
            {poll.options && (
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700"> {/* Added styling */}
                {poll.options.map((option) => (
                  <li key={option.id}>
                    {option.option_text} {option.vote_count}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollList;
