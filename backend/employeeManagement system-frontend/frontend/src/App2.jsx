import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App2 = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", position: "", salary: "" });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get("http://localhost:8080/employees");
        setEmployees(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/employees", formData);
        fetchEmployees();
        setFormData({ name: "", email: "", position: "", salary: "" });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="container">
            <h2>Employee Management System</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} required />
                <button type="submit">Add Employee</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App2;
