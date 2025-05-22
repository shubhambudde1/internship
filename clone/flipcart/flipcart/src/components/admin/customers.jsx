import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/customer');
      setCustomers(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error('Failed to fetch customers');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/customer/${id}/status`, { status: newStatus });
      toast.success(`Customer ${newStatus === 'Blocked' ? 'Blocked' : 'Unblocked'}`);
      fetchCustomers();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    const lower = search.toLowerCase();
    const filteredData = customers.filter(
      c =>
        c.name.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.phone.includes(lower)
    ).filter(c => statusFilter === '' || c.status === statusFilter);
    setFiltered(filteredData);
  }, [search, statusFilter, customers]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Management</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name, Email, Phone"
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cust) => (
              <tr key={cust.id}>
                <td className="p-2 border">{cust.id}</td>
                <td className="p-2 border">{cust.name}</td>
                <td className="p-2 border">{cust.email}</td>
                <td className="p-2 border">{cust.phone}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-white ${cust.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {cust.status}
                  </span>
                </td>
                <td className="p-2 border">{new Date(cust.created_at).toLocaleDateString()}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleStatusChange(cust.id, cust.status === 'Active' ? 'Blocked' : 'Active')}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    {cust.status === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerManagement;
