import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign in</h1>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Next
        </button>
        <p className="text-center text-sm mt-4">
          Not your computer? Use Guest mode to sign in privately.
        </p>
        <p className="text-center text-sm text-blue-500 cursor-pointer mt-2">
          Forgot password?
        </p>
      </div>
    </div>
  );
}


