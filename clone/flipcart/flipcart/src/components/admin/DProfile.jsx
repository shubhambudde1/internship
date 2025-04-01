import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/profile/images.jpeg";

const DProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Load user profile from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle input changes for the user profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Save the user profile to localStorage when the Submit button is clicked
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "", email: "", address: "", phone: "" });
    alert("Logged out successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-4 border-b pb-2">
        <button
          className={`px-4 py-2 ${
            activeTab === "profile" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Settings
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "orders" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Order History
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "wishlist" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist
        </button>
      </div>

      {activeTab === "profile" && (
        <div className="space-y-4">
          {user.name ? (
            <>
              <div className="flex items-center">
                <img
                  src={profileImg}
                  alt={user.name}
                  className="w-80 h-70 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <p className="m-2">Name: {user.name}</p>
                  <p className="m-2">Email: {user.email}</p>
                  <p className="m-2">Address: {user.address}</p>
                  <p className="m-2">Phone: {user.phone}</p>
                 
                
                </div>
              </div>

              <button
                onClick={saveProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
              >
                Update Profile
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mt-5 ml-4"
              >
                Logout
              </button>
             
                
           
            </>


          ) : (
            <div>
              <div className="flex items-center">
                <img
                  src={profileImg}
                  alt={user.name}
                  className="w-80 h-70 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="block w-full p-2 border rounded mb-4"
                  />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full p-2 border rounded mb-4"
                  />
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="block w-full p-2 border rounded mb-4"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="block w-full p-2 border rounded mb-5"
                  />
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
                onClick={saveProfile}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Order History</h2>
          {orders.map((order) => (
            <div key={order.id} className="border p-2 rounded mb-2">
              <p>Order ID: {order.id}</p>
              <h3 className="text-lg font-semibold mt-4">Items:</h3>
              <ul className="list-disc list-inside">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${parseFloat(item.price).toFixed(2)} x{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                Status: <span className="font-semibold">{order.status}</span>
              </p>
              <a
                href="/order-history"
                className="bg-green-500 text-white px-3 py-1 mt-2 rounded inline-block"
              >
                Order History
              </a>
            </div>
          ))}
        </div>
      )}

      {activeTab === "wishlist" && (
        <h2 className="text-xl font-semibold">Wishlist (Coming Soon!)</h2>
      )}
    </div>
  );
};

export default DProfile;
