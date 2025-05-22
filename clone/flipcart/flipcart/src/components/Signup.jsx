import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState(""); // Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle user signup
  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const newUser = { name, email, password, role: "user" }; // Added default role
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/signup",
        newUser
      );
      if (response.status === 201) {
        const { user } = response.data;
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        alert("Signup successful!");
        navigate("/");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Signup failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Email"
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
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
