import React, { useEffect, useState } from "react";
import { getLoyaltyDetails } from "./loyaltyApi";
import TransactionHistory from "./TransactionHistory";
import axios from "axios";

function Dashboardu() {
  const [loyalty, setLoyalty] = useState(null);
  const userId = 1;
  useEffect(() => {
    async function fetchData() {
      const data = await getLoyaltyDetails(userId);
      setLoyalty(data);
    }
    fetchData();
  }, [userId]);

  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/orders`);
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  if (!loyalty) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Loyalty Points Balance: {loyalty.points}
      </h2>
      <h3 className="mt-4 text-lg">Current Tier: {loyalty.tier}</h3>
      <TransactionHistory history={loyalty.history} />
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Your Orders</h3>
        <ul>
          {orderHistory.map((order) => (
            <li key={order._id}>Order ID: {order._id}, Total: ${order.totalCost}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboardu;
