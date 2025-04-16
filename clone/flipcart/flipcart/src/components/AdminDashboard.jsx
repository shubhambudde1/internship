import React, { useState, useEffect } from "react";
import ManageProducts1 from "./admin/dmanageproduct/manageorders";
import ManageUsers from "./admin/ManageUsers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageReviews from "./admin/ManageReviews";

import { Tooltip } from "react-tooltip";
import Analysis from "./admin/Analyst";
import PaymentMethods from "./admin/PaymentMethods";
import Reports from "./admin/OrderHeatmap";
import ReturnReq from "./admin/ReturnReq";



const ManageProducts = () => {

  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [Showtable, setShowtable] = useState(false);
  const [product, setproduct] = useState(false);
  const [analytics, setanalytics] = useState(false);
  const [users, setusers] = useState(false);
  const [showpaymentMethods, setShowpaymentMethods] = useState(false);
  const [newProduct, setNewProduct] = useState({
 
    name: "",
    price: "",
    stock: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [Reviews, setReviews] = useState(false);
  const [reports, setreports] = useState(false);
  const [ReturnReqshow, setReturnReqshow] = useState(false);
  
  


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
    setNewProduct({ name: "", price: "", stock: "" });
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen flex"
          : "bg-white text-black min-h-screen flex"
      }
    >
      {/* Sidebar */}
      <div className="w-1/6  border-r border-gray-300  bg-blue-500 pt-25">
        <div className="flex flex-col space-y-4 left-5 z-[1]">
        <div id="full" className="w-full border-b border-gray-600 "></div>
          <button
            className="px-2 py-2  rounded italic text-white hover:bg-blue-400 hover:text-white"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setShowtable(true);
              setproduct(false);
              setusers(false);
              setanalytics(false);
              setreports(false);
            }}
          >
            <Tooltip id="add-product-tooltip" content="Add a new product to the inventory" />
            Add Product
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4 rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setproduct(true);
              setShowtable(false);
              setusers(false);
              setanalytics(false);
              setreports(false);
            }}
          >
            <Tooltip id="manage-orders-tooltip" content="View and manage all orders" />
            Manage Orders
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {setusers(true); setShowtable(false); setproduct(false); setanalytics(false);setreports(false);}}
            data-tooltip-id="users-tooltip"
            data-tooltip-content="Manage all users"
            data-tooltip-place="right"
            data-tooltip-variant="light"
            data-tooltip-delay-show={200}
            data-tooltip-delay-hide={200}
            data-tooltip-float={true}
          >
            <Tooltip id="users-tooltip" content="Manage all users" />
            Users
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {setanalytics(true); setShowtable(false); setproduct(false); setusers(false);setreports(false);}}
            data-tooltip-id="analytics-tooltip"
            data-tooltip-content="View sales and user analytics"
            data-tooltip-place="right"
            data-tooltip-variant="light"
            data-tooltip-delay-show={200}
            data-tooltip-delay-hide={200}
            data-tooltip-float={true}
          >
            <Tooltip id="analytics-tooltip" content="View sales and user analytics" />
            Analytics
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setShowtable(false);
              setproduct(false);
              setusers(false);
              setanalytics(false);
              setreports(false);
              setReviews(true);
            }}
          >
         Reviews
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setShowtable(false);
              setproduct(false);
              setusers(false);
              setanalytics(false);
              setreports(false);
              setReviews(false);
              setShowpaymentMethods(true);

            }}
          >
           Paymethod
          </button>
      
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setShowtable(false);
              setproduct(false);
              setusers(false);
              setanalytics(false);
              setReviews(false);setShowpaymentMethods(false);
              setreports(true);

            }}
          >
           reports
          </button>
    
          
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => {
              setShowtable(false);
              setproduct(false);
              setusers(false);
              setanalytics(false);
              setReviews(false);setShowpaymentMethods(false);
              setreports(false);
              setReturnReqshow(true);

            }}
          >
          return 
          </button>
          <div className="border-b border-gray-600 "></div>
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 w-5/6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="relative inline-block w-14 h-8">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="opacity-0 w-0 h-0"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label
              htmlFor="darkModeToggle"
              className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition-colors duration-300"
            >
              <span
                className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              ></span>
            </label>
          </div>
        </div>
        <Tooltip id="dark-mode-tooltip" content="Toggle dark mode" />


        {Showtable && <ManageProducts1 />}

        {showForm && (
          <div className="mt-6 p-4 border border-gray-300 rounded shadow-md">
            <h3 className="text-lg font-semibold">
              {editIndex !== null ? "Edit" : "Add"} Product
            </h3>
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
            <label className="block mt-2">Stock:</label>
            <input
              type="number"
              className="border border-gray-300 p-2 w-full rounded"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <Tooltip id="product-name-tooltip" content="Enter the product name" />
            <Tooltip id="product-price-tooltip" content="Enter the product price" />

            <Tooltip
              id="product-form-tooltip"
              content="Fill in the product details and click 'Save' to add or update the product."
              place="top"
            />

            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Highlight low stock products */}
        {products.some(product => product.stock < 30) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Low Stock Alert!</strong>
            <span className="block sm:inline">
              The following products are running low on stock:
              {products
                .filter(product => product.stock < 30)
                .map(product => product.name)
                .join(', ')}
            </span>
          </div>
        )}


        {product && (
          <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <select
                className="border border-gray-300 p-2 rounded"
                onChange={(e) => {
                  const selectedStatus = e.target.value;
                  const filteredOrders = orders.filter(
                    (order) => order.status === selectedStatus
                  );
                  setOrders(filteredOrders);
                }}
              >
                <option value="">
                  All
                </option>
                <option value="Departed">Departed</option>
                <option value="Ready to Leave">Ready to Leave</option>
                <option value="Completed">Completed</option>
              </select>
            </div>



            <h1 className="text-2xl font-bold mb-4">
              Manage Orders
            </h1>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    className="bg-white shadow-lg rounded-lg p-4"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      Order #{order.id}
                    </h2>
                    <p className="text-gray-600">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">Status: <span className="font-semibold">{order.status}</span>
                    </p>
                    <h3 className="text-lg font-semibold mt-4">Items:</h3>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} - ${item.price} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-800 font-semibold mt-4">
                      Total Cost: $
                      {order.totalCost
                        ? order.totalCost.toFixed(2)
                        : "N/A"}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        onClick={() => {
                          <Tooltip id="ready-to-leave-tooltip" content="Mark the order as ready to leave" />

                          updateOrderStatus(index, "Ready to Leave");
                          toast.success("Order is Ready to Leave");
                        }}
                      >
                        Ready to Leave
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        data-tooltip-id="departed-tooltip"
                        onClick={() => {
                          updateOrderStatus(index, "Departed");
                          toast.info("Order has Departed");
                        }}
                      >
                        Departed
                      </button>
                      <button
                        data-tooltip-id="completed-tooltip"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => {
                          updateOrderStatus(index, "Completed");
                          toast.success("Order Completed");
                        }}
                      >
                        Completed
                      </button>
                      <Tooltip id="ready-to-leave-tooltip" content="Mark the order as ready to leave" />
                      <Tooltip id="departed-tooltip" content="Mark the order as departed" />
                      <Tooltip id="completed-tooltip" content="Mark the order as completed" />

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <ToastContainer />
      

        {users && <ManageUsers />}
        {analytics && <Analysis />}
        {Reviews && <ManageReviews />}
        {showpaymentMethods && <PaymentMethods />}
        {reports && <Reports />}
        {ReturnReqshow && <ReturnReq />}
      </div>
    </div>
  );
};


export default ManageProducts;
