import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Poll App</h1>
      <div className="flex space-x-4">
        <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Poll</Link>
        <Link to="/polls" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Poll List</Link>
      </div>
    </div>
  );
}

export default HomePage;
