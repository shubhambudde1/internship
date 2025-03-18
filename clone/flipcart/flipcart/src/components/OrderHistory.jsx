import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
    console.log(orders);
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
              <h2 className="text-lg font-medium mb-1">Order {order.id || index + 1}</h2>
              <p className="text-gray-600">
                Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-600">Status: {order.status || "Pending"}</p>
              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${parseFloat(item.price).toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-semibold mt-4">
                Total Cost: ${parseFloat(order.totalCost || 0).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
