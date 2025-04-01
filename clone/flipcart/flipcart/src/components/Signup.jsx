import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState(""); // Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch existing users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle user signup
  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const newUser = { name, email, password };

    try {
      const res = await axios.post("http://localhost:5001/api/users", newUser);
      const savedUser = res.data;

      // Store only user ID in localStorage (not password!)
      localStorage.setItem("currentUser", JSON.stringify({ id: savedUser.id, name: savedUser.name, email: savedUser.email, role: savedUser.role }));
      localStorage.setItem("isLoggedIn", "true");

      setUsers((prevUsers) => [...prevUsers, savedUser]);

      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      console.error("Error creating user:", err);
      alert("Signup failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.some((user) => user.email === email)) {
      alert("User already exists!");
    } else {
      handleSignup();
    }
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
