import React, { useState, useEffect } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Update order status
  const updateOrderStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-gray-600">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Status: <span className="font-semibold">{order.status}</span></p>
              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-semibold mt-4">
                Total Cost: ${order.totalCost ? order.totalCost.toFixed(2) : "N/A"}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => updateOrderStatus(index, "Ready to Leave")}
                >
                  Ready to Leave
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => updateOrderStatus(index, "Departed")}
                >
                  Departed
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => updateOrderStatus(index, "Completed")}
                >
                  Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;