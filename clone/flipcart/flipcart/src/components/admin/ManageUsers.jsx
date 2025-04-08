import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const ManageUsers = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [selectedRole, setSelectedRole] = useState("all"); // State for selected role
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Fetch users and current user from backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data); // Initialize filtered users
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error(
          `Failed to fetch users: ${err.response?.data?.message || err.message}`
        );
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, []);

  // Handle role selection
  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    if (role === "all") {
      setFilteredUsers(users); // Show all users
    } else {
      setFilteredUsers(users.filter((user) => user.role === role)); // Filter users by role
    }
  };

  // Handle input changes for adding a new user
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add a new user
  const handleAddUser = () => {
    axios
      .post("http://localhost:5001/api/users", newUser)
      .then((res) => {
        toast.success(`User ${newUser.name} added successfully!`);
        setUsers([...users, res.data]);
        setFilteredUsers([...filteredUsers, res.data]); // Update filtered users
        setNewUser({ name: "", email: "", password: "", role: "user" });
        setShowAddUserForm(false);
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        toast.error(
          `Failed to add user: ${err.response?.data?.message || err.message}`
        );
      });
  };

  // Delete a user
  const deleteUser = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    const isAdmin = userToDelete && userToDelete.role === "admin";
    if (isAdmin) {
      alert(
        "Admin users cannot be deleted directly. Please contact the database administrator."
      );
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axios
      .delete(`http://localhost:5001/api/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers.filter((user) => user.role === selectedRole || selectedRole === "all")); // Update filtered users
        toast.success(`User deleted successfully!`);
      })
      .catch((err) =>
        alert("Error deleting user: " + err.response?.data?.message || err.message)
      );
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="container mx-auto p-4">
        You do not have permission to view this page.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute right-10 top-44 m-4"
        onClick={() => setShowAddUserForm(!showAddUserForm)}
      >
        Add User
      </button>
      <div className="flex space-x-4 mb-4">
        <select
          name="role"
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-1/4 px-4 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="super-admin">Super Admin</option>
          <option value="product-manager">Product Manager</option>
          <option value="order-manager">Order Manager</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {showAddUserForm && (
        <form onSubmit={handleAddUser}>
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Password"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-1/2 px-4 py-2 border rounded-md"
            >
              <option value="super-admin">Super Admin</option>
              <option value="product-manager">Product Manager</option>
              <option value="order-manager">Order Manager</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div>
                <p
                  className={`font-medium text-gray-800 ${
                    user.role === "admin" ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {user.name}
                </p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className={`text-xs text-gray-500`}>Role: {user.role}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                data-tooltip-id="edit-user-tooltip"
              >
                Edit
              </button>
              <Tooltip id="edit-user-tooltip" content="Edit user details" />

              {currentUser && currentUser.role === "admin" && (
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  data-tooltip-id="delete-user-tooltip"
                >
                  Delete
                </button>
              )}
              <Tooltip id="delete-user-tooltip" content="Delete this user" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
