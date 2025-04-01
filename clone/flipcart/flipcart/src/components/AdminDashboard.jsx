import React, { useState, useEffect } from "react";
import ManageProducts1 from "./admin/dmanageproduct/manageorders";
import ManageUsers from "./admin/ManageUsers";
  import Analysis from "./admin/Analyst";
  

const ManageProducts = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [Showtable, setShowtable] = useState(false);
  const [product, setproduct] = useState(false);
  const [analytics, setanalytics] = useState(false);
  const [users, setusers] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", rating: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleSave = () => {
    let updatedProducts;
    if (editIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
    } else {
      updatedProducts = [...products, newProduct];
    }
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowForm(false);
    setNewProduct({ name: "", price: "", rating: "" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashbord</h2>
      <button className=" px-4 py-2 rounded italic text-sky-400" style={{fontStyle: "italic", fontFamily: "cursive"}} onClick={() => setShowtable((prev) => !prev)}>add product</button>
      {/* <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>Add Product</button> */}
      {/* <a href="./Manageproduct" className="px-4 py-2 rounded italic text-sky-400" style={{fontStyle: "italic", fontFamily: "cursive"}}>show Orders</a> */}
      <button className=" px-4 py-2 rounded italic text-sky-400" style={{fontStyle: "italic", fontFamily: "cursive"}} onClick={() => setproduct((prev) => !prev)}>product list</button>
      <button className=" px-4 py-2 rounded italic text-sky-400" style={{fontStyle: "italic", fontFamily: "cursive"}} onClick={() => setusers((prev) => !prev)}>users</button>
      <button className=" px-4 py-2 rounded italic text-sky-400" style={{fontStyle: "italic", fontFamily: "cursive"}} onClick={() => setanalytics((prev) => !prev)}>analytics</button>
      
      {Showtable && (
      <ManageProducts1 />
      )}


      {showForm && (
        <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
          <h3 className="text-lg font-semibold">{editIndex !== null ? "Edit" : "Add"} Product</h3>
          <label className="block mt-2">Name:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <label className="block mt-2">Price:</label>
          <input
            type="number"
            className="border border-gray-300 p-2 w-full rounded"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <label className="block mt-2">Rating:</label>
          <input
            type="number"
            className="border border-gray-300 p-2 w-full rounded"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
          />
          <div className="mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

    {/* adding the product configration */}
    {product && (
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
    )}
    {users && (
    <ManageUsers />
     )} 
    {analytics && (
      <Analysis />
    )}

    </div>
  );
};

export default ManageProducts;
