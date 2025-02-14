import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styles.css';


const App = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/employees/${editingId}`, form);
      toast.success("Employee Updated");
    } else {
      await axios.post("http://localhost:5000/employees", form);
      toast.success("Employee Added");
    }
    setForm({ name: "", email: "", position: "", salary: "" });
    setEditingId(null);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditingId(emp.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    toast.error("Employee Deleted");
    fetchEmployees();
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="text" placeholder="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
        <input type="number" placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
        <button type="submit">{editingId ? "Update" : "Add"} Employee</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default App;
