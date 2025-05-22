import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discount_type: "FLAT",
    discount_value: "",
    min_order_amount: "",
    expiry_date: ""
  });
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/coupons/");
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to fetch coupons");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5001/api/coupons/${editId}`, form);
        toast.success("Coupon updated successfully!");
      } else {
        await axios.post("http://localhost:5001/api/coupons/", form);
        toast.success("Coupon created successfully!");
      }
      
      setForm({
        code: "",
        
        discount_type: "FLAT",
        discount_value: "",
        min_order_amount: "",
        expiry_date: "",
      });
      setShowForm(false);
      setEditId(null);
      fetchCoupons();
    } catch (err) { 
      toast.error("Error saving coupon");
    }
  };

  const handleEdit = (coupon) => {
    setEditId(coupon.id);
    setForm({
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      min_order_amount: coupon.min_order_amount,
      expiry_date: coupon.expiry_date.split("T")[0],
    });
    setShowForm(true);

  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/coupons/${id}/status`);
      toast.success("Status updated!");
      fetchCoupons();
    } catch(err) {
      toast.error("Failed to update status");
    }
  };

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus ? c.status === filterStatus : true)
  );

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditId(null);
    setForm({
      code: "",
      discount_type: "FLAT",
      discount_value: "",
      min_order_amount: "",
      expiry_date: "",
      
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Coupon Management</h2>
      <div className="mb-4">
        <button
          onClick={handleShowForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? "Hide Form" : "Add New Coupon"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 border p-4 rounded mb-6 bg-gray-100"
        >
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder="Coupon Code"
            required
            className="w-full p-2 rounded border"
          />
          <select
            type="text"
            value={form.discount_type}
            onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
            className="w-full p-2 rounded border"
          >
            <option value="FLAT">Flat</option>
            <option value="PERCENTAGE">Percentage</option>
          </select>
          <input
            type="number"
            value={form.discount_value}
            onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
            placeholder="Discount Value"
            className="w-full p-2 rounded border"
            required
          />
          <input
            type="number"
            value={form.min_order_amount}
            onChange={(e) =>
              setForm({ ...form, min_order_amount: e.target.value })
            }
            placeholder="Minimum Order Amount"
            className="w-full p-2 rounded border"
            required
          />
          <input
            type="date"
            value={form.expiry_date}
            onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
            className="w-full p-2 rounded border"
          />
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editId ? "Update Coupon" : "Add Coupon"}
          </button>
        </form>
      )}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
      

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300">Code</th>
                <th className="p-2 border border-gray-300">Type</th>
                <th className="p-2 border border-gray-300">Value</th>
                <th className="p-2 border border-gray-300">Min Order</th>
                <th className="p-2 border border-gray-300">Expiry</th>
                <th className="p-2 border border-gray-300">Status</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="text-center border-t">
                  <td className="p-2 border border-gray-300">{c.code}</td>
                  <td className="p-2 border border-gray-300">{c.discount_type}</td>
                  <td className="p-2 border border-gray-300">{c.discount_value}</td>
                  <td className="p-2 border border-gray-300">
                    {c.min_order_amount}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {c.expiry_date.split("T")[0]}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        c.status === "ACTIVE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <button onClick={() => handleEdit(c)} className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button onClick={() => toggleStatus(c.id)} className="text-yellow-500 hover:underline">Toggle</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CouponManagement;
