import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch users and current user from backend
    useEffect(() => {
        axios.get("http://localhost:5001/api/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(user);
        if (!user || user.role !== 'admin') {
            navigate('/dashboard');
        }
    }, []);

    // Delete user
    const deleteUser = (id) => {
        const userToDelete = users.find(user => user.id === id);
        const isAdmin = userToDelete && userToDelete.role === 'admin';
        if (isAdmin) {
            alert("Admin users cannot be deleted directly. Please contact the database administrator.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        axios.delete(`http://localhost:5001/api/users/${id}`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(err => alert("Error deleting user: " + err.response?.data?.message || err.message));
    };

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="container mx-auto p-4">You do not have permission to view this page.</div>
        );
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr >
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">User Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map(user => (
                        <tr key={user.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {currentUser && currentUser.role === 'admin' && (                                    
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default ManageUsers;
