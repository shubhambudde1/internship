import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const OrderHistry = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);

  // Fetch orders from localStorage on component mount
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("allOrders")) || [];
    setAllOrders(orders);
  }, []);

  const handleReturnRequest = async (orderIndex, productIndex) => {
    const product = allOrders[orderIndex].items[productIndex];
    const reason = prompt("Enter the reason for returning this product:");
    if (!reason) return;

    const newRequest = {
      order_id: orderIndex + 1, // Assuming orderIndex corresponds to order ID
      product_name: product.name,
      reason,
      status: "Pending",
    };

    try {
      // Send return request to the backend
      const response = await axios.post("http://localhost:5001/api/ordeReturn", newRequest);
      if (response.status === 200) {
        alert("Return request submitted successfully!");
        setReturnRequests((prevRequests) => [...prevRequests, newRequest]);
      }
    } catch (error) {
      console.error("Error submitting return request:", error);
      alert("Failed to submit return request. Please try again.");
    }
  };

  const generateInvoice = (order, index) => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(20);
    doc.text("Order Invoice", 20, 30);

    doc.setFontSize(12);
    doc.text(`Order ID: ${index + 1}`, 20, 40);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`, 20, 50);

    doc.text("User Information", 20, 60);
    doc.text(`Name: ${order.name}`, 20, 70);
    doc.text(`Address: ${order.address}`, 20, 80);
    doc.text(`Phone: ${order.phone}`, 20, 90);

    doc.text("Purchased Products", 20, 100);
    let y = 110;
    order.items.forEach((item) => {
      doc.text(
        `${item.name} - Quantity: ${item.quantity} - Price: $${item.price}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`Total Cost: $${order.totalCost}`, 20, y + 10);
    doc.text(`Payment Method: ${order.paymentMethod}`, 20, y + 20);

    // Save the PDF
    doc.save(`invoice_${index + 1}.pdf`);
  };

  const renderOrderDetails = (order, index) => (
    <div
      key={index}
      className="border border-gray-300 rounded-lg p-4 bg-white shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2">Order #{index + 1}</h3>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(order.date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Name:</span> {order.name}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Address:</span> {order.address}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Phone:</span> {order.phone}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Total Cost:</span> ${order.totalCost}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Payment Method:</span>{" "}
        {order.paymentMethod}
      </p>
      <h4 className="text-sm font-semibold mt-4">Products:</h4>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {order.items.map((item, idx) => (
          <li key={idx} className="mb-2">
            {item.name} - ${item.price} x {item.quantity}
            <button
              onClick={() => handleReturnRequest(index, idx)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Return
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => generateInvoice(order, index)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download Invoice
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {allOrders.length === 0 ? (
        <p className="text-gray-500">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order, index) => renderOrderDetails(order, index))}
        </div>
      )}

      {returnRequests.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Return Requests</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {returnRequests.map((request, idx) => (
              <li key={idx}>
                <span className="font-semibold">Order ID:</span>{" "}
                {request.order_id}, <span className="font-semibold">Product:</span>{" "}
                {request.product_name}, <span className="font-semibold">Reason:</span>{" "}
                {request.reason}, <span className="font-semibold">Status:</span>{" "}
                {request.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderHistry;