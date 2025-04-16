import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";

function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState({ min: 0, max: 5 });
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  useEffect(() => {
    let tempReviews = [...reviews];

    if (searchQuery) {
      tempReviews = tempReviews.filter(review =>
        review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (productFilter) {
      tempReviews = tempReviews.filter(review => review.productName === productFilter);
    }
    tempReviews = tempReviews.filter(review => review.rating >= ratingFilter.min && review.rating <= ratingFilter.max);

    if (statusFilter) {
      tempReviews = tempReviews.filter(review => review.status === statusFilter);
    }

    setFilteredReviews(tempReviews);
  }, [reviews, searchQuery, productFilter, ratingFilter, statusFilter]);

  const handleApprove = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].status = 'Approved';
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  const handleReject = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].status = 'Rejected';
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  const handleRespond = (index) => {
    alert(`Respond to review at index ${index}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductFilterChange = (event) => {
    setProductFilter(event.target.value);
  };

  const handleRatingFilterChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRatingFilter({ min: value, max: 5 });
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleOpenModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      <div className="mb-4 flex gap-4">
        <input type="text" placeholder="Search by product name or comment" value={searchQuery} onChange={handleSearchChange} className="border border-gray-300 px-3 py-2 rounded" />
        <select value={productFilter} onChange={handleProductFilterChange} className="border border-gray-300 px-3 py-2 rounded">
          <option value="">All Products</option>
          {[...new Set(reviews.map(review => review.productName))].map(productName => <option key={productName} value={productName}>{productName}</option>)}
        </select>
        <select value={ratingFilter.min} onChange={handleRatingFilterChange} className="border border-gray-300 px-3 py-2 rounded"><option value="0">All Ratings</option><option value="1">1 Star & Above</option><option value="2">2 Stars & Above</option><option value="3">3 Stars & Above</option><option value="4">4 Stars & Above</option><option value="5">5 Stars</option></select>
        <select value={statusFilter} onChange={handleStatusFilterChange} className="border border-gray-300 px-3 py-2 rounded"><option value="">All Statuses</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option><option value="Pending">Pending</option></select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Review Comment</th>
            <th className="border border-gray-300 px-4 py-2">Date Submitted</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map((review, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal(review);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  {review.productName}
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenModal(review);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Customer
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">{review.comment}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(review.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{review.status || 'Pending'}</td>
              <td className="border border-gray-300 px-4 py-2">
                {review.status !== 'Approved' && (
                  <button
                    onClick={() => {
                      handleApprove(index);
                      toast.success('Review approved');
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                )}
                {review.status !== 'Rejected' && (
                  <button
                    onClick={() => {
                      handleReject(index);
                      toast.warn('Review rejected');
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(index);
                    toast.error('Review deleted');
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleRespond(index);
                    toast.info('Response sent');
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">Review Details</h3>
            <p><strong>Product Name:</strong> {selectedReview.productName}</p>
            <p><strong>Customer Name:</strong> Customer</p>
            <p><strong>Rating:</strong> {selectedReview.rating} Stars</p>
            <p><strong>Comment:</strong> {selectedReview.comment}</p>
            <p><strong>Date Submitted:</strong> {new Date(selectedReview.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedReview.status || 'Pending'}</p>
            <p><strong>Admin Responses:</strong> {selectedReview.responses || 'No responses yet'}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageReviews;
