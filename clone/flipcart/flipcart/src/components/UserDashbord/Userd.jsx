import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

// Placeholder Avatar Component (can be moved to a separate file if used elsewhere)
const PlaceholderAvatar = ({ name, className = "w-32 h-32" }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "U";
  return (
    <div
      className={`${className} rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold shadow-md`}
    >
      {initial}
    </div>
  );
};

PlaceholderAvatar.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

const getCurrentUserFromLocalStorage = () => {
  try {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch {
    return null;
  }
};

const Userd = ({ onUserUpdate }) => {
  // Get user from localStorage
  const [user, setUser] = useState(getCurrentUserFromLocalStorage());

  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "", // Added for validation
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // If user changes in localStorage, update state
    setUser(getCurrentUserFromLocalStorage());
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "", // Clear on user change
        password: "",
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Name cannot be empty.";
    }
    if (!form.email.trim()) {
      return "Email cannot be empty.";
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address.";
    }
    // Password strength validation (if changing password)
    if (form.password && form.password.trim() !== "") {
      if (form.password.length < 8) {
        return "Password must be at least 8 characters long.";
      }
      if (!/[A-Z]/.test(form.password)) {
        return "Password must contain at least one uppercase letter.";
      }
      if (!/[a-z]/.test(form.password)) {
        return "Password must contain at least one lowercase letter.";
      }
      if (!/[0-9]/.test(form.password)) {
        return "Password must contain at least one number.";
      }
    }
    return ""; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const updatePayload = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      const validationError = validateForm();
      if (validationError) {
        setMessage(validationError);
        return;
      }


      if (form.password && form.password.trim() !== "") {
        updatePayload.password = form.password;
      }

      const res = await axios.put(`http://localhost:5001/api/users/${user.id}`, updatePayload);
      setMessage(res.data.message || "Profile updated successfully!");
      setIsEditing(false);

      // Update localStorage with new user data
      const updatedUser = {
        ...user,
        name: form.name,
        email: form.email,
        role: form.role,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed. Please try again.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage("");
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "", // Clear on edit click
        password: "",
        role: user.role || "user",
      });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setMessage("");
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "", // Clear on cancel click
        password: "",
        role: user.role || "user",
      });
    }
  };

  if (!user) {
    return <div className="max-w-2xl mx-auto p-6 text-center">Loading user data or user not found...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left Side: Avatar */}
        <div className="flex-shrink-0 md:w-1/3 flex flex-col items-center">
          <PlaceholderAvatar name={user.name} className="w-32 h-32 md:w-40 md:h-40" />
          {/* If you have an image URL: <img src={user.imageUrl || 'default-avatar.png'} alt={user.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md" /> */}
          {!isEditing && (
             <button
                onClick={handleEditClick}
                className="mt-6 w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Profile
              </button>
          )}
        </div>

        {/* Right Side: Info or Form */}
        <div className="flex-grow md:w-2/3">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text" name="name" id="name" value={form.name} onChange={handleChange} placeholder="Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password (required to update)</label>
                <input
                  type="password" name="currentPassword" id="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="Enter current password" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                <input
                  type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Leave blank to keep current"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role" id="role" value={form.role} onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled // Typically, users shouldn't change their own role. Admins might do this on a different interface.
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Role cannot be changed from this page.</p>
              </div>
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button" onClick={handleCancelClick}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-lg text-gray-700">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-lg text-gray-700 capitalize">{user.role}</p>
              </div>
            </div>
          )}
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${message.includes("failed") || message.includes("incomplete") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Userd.propTypes = {
  onUserUpdate: PropTypes.func,
};

Userd.defaultProps = {
  onUserUpdate: () => {},
};

export default Userd;