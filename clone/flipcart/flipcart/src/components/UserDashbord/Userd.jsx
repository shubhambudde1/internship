import React, { useState } from "react";
import axios from "axios";

const Userd = ({ user }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: "",
    role: user.role,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace /api/users/ with your actual endpoint
      const res = await axios.put(`http://localhost:5001/api/users/${user.id}`, form);
      setMessage(res.data.message || "Profile updated!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="New Password"
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Update Info
      </button>
      {message && <div className="mt-2 text-center text-sm">{message}</div>}
    </form>
  );
};

export default Userd;