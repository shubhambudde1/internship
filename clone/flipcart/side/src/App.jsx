import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import PollDetails from './PollDetails';
import HomePage from './HomePage';

function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:3000/polls');
        if (response.ok) {
          const data = await response.json();
          setPolls(data);
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
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/polls" element={<PollList polls={polls} />} />
        <Route path="/polls/:id" element={<PollDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
