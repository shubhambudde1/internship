import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const ReturnReq = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    // Fetch return requests from the API
    const fetchReturns = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5001/api/return'); // Use your backend URL
            setReturns(response.data);
            console.log("Return requests fetched successfully:", response.data);
        } catch (err) {
            console.error("Error fetching return requests:", err);
            setError('Failed to load return requests. Please try again later.');
            toast.error('Failed to load return requests.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch returns on component mount
    useEffect(() => {
        fetchReturns();
    }, []);

    // Handle approving a request
    const handleApprove = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5001/api/return/${id}/approve`);
            // Update the local state to reflect the change immediately
            setReturns(prevReturns =>
                prevReturns.map(req =>
                    req.id === id ? { ...req, status: 'Approved' } : req
                )
            );
            toast.success(`Return request #${id} approved!`);
        } catch (err) {
            console.error(`Error approving return request ${id}:`, err);
            toast.error(`Failed to approve request #${id}. ${err.response?.data?.message || ''}`);
        }
    };

    // Handle rejecting a request
    const handleReject = async (id) => {
         try {
            const response = await axios.put(`http://localhost:5001/api/return/${id}/reject`);
            // Update the local state
            setReturns(prevReturns =>
                prevReturns.map(req =>
                    req.id === id ? { ...req, status: 'Rejected' } : req
                )
            );
            toast.warn(`Return request #${id} rejected.`);
        } catch (err) {
            console.error(`Error rejecting return request ${id}:`, err);
            toast.error(`Failed to reject request #${id}. ${err.response?.data?.message || ''}`);
        }
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleString();
        } catch (e) {
            return dateString; // Return original if parsing fails
        }
    };

    // Helper for status badge styling
    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Manage Return Requests</h1>

            {loading && <p className="text-center text-gray-600">Loading requests...</p>}
            {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {returns.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">No return requests found.</td>
                                </tr>
                            ) : (
                                returns.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{request.order_id}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{request.customer_name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{request.product_name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 max-w-xs truncate" title={request.reason}>{request.reason}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(request.request_date)}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            {request.status === 'Pending' && (
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleApprove(request.id)}
                                                        className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded text-xs"
                                                        title="Approve Request"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(request.id)}
                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-xs"
                                                        title="Reject Request"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {request.status !== 'Pending' && (
                                                <span className="text-gray-400 text-xs italic">Processed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReturnReq;
