import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ReturnsManagement() {
  const [returnsList, setReturnsList] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    const res = await axios.get('http://localhost:5001/api/ordeReturn');
    setReturnsList(res.data);
  };

  const handleAction = async (id, action) => {
    try {
      await axios.post(`http://localhost:5001/api/returnorder/${id}/${action}`);
      toast.success(`${action} successful`);
    } catch (error) {
      toast.error(`Error during ${action}`);
    }
    fetchReturns();
  };

  const filteredReturns = returnsList.filter(r =>
    (filter === '' || r.status === filter) &&
    (r.user_name.toLowerCase().includes(search.toLowerCase()) ||
     r.product_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user or product"
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">All</option>
          <option value="Requested">Requested</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">User</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Reason</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Requested</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReturns.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 border-b">{r.order_id}</td>
                <td className="px-4 py-2 border-b">{r.user_name}</td>
                <td className="px-4 py-2 border-b">{r.product_name}</td>
                <td className="px-4 py-2 border-b">{r.reason.slice(0, 30)}...</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded 
                      ${r.status === 'Requested' ? 'bg-blue-500 text-white' :
                        r.status === 'Approved' ? 'bg-green-500 text-white' :
                        r.status === 'Rejected' ? 'bg-red-500 text-white' :
                        'bg-yellow-500 text-white'}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">{new Date(r.requested_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">
                  {r.status === 'Requested' && (
                    <>
                      <button
                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white mr-2"
                        onClick={() => handleAction(r.id, 'approve')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleAction(r.id, 'reject')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {r.status === 'Approved' && (
                    <button
                      className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
                      onClick={() => handleAction(r.id, 'refund')}
                    >
                      Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReturnsManagement;
