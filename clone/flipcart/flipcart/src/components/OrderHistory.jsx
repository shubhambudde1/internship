import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    console.log(storedOrders);
  }, []);

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.slice().reverse().map((order, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium mb-1">Order {order.id || index + 1}</h2>
              <div>
              <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded-full">{order.status || "Pending"}</span>
              <p className="text-gray-800 font-semibold mt-4">
                Total Cost: ${parseFloat(order.totalCost || 0).toFixed(2)}
              </p>
                
              </div>

              </div>
              <p className="text-gray-600">
                Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
              </p>
             
              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
             
              <button
                className="text-gray-600 focus:outline-none"
                type="button"
                onClick={() => {
                  const element = document.getElementById(`order-${index}`);
                  if (element) {
                    element.classList.toggle("hidden");
                  }
                }}
              >
                Show Details
              </button>
              <div id={`order-${index}`} className="hidden">
                <p className="text-gray-600">Name: {order.name}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">Phone: {order.phone}</p>
                <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
