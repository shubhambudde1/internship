// src/App.jsx (or your main app file)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/Catagery/ProductList.jsx';
import ProductDetail from './components/Catagery/ProductDetail.jsx';
import CartPage from './components/Catagery/CartPage.jsx';
import Main from './components/Main';
import { CartProvider } from './components/Catagery/CartContext.jsx';
import Login from './components/Login';
import Header from './components/Header';
import Checkout from './components/Checkout';
import Welcome from './components/welcome'; // Import Welcome component
import Footer from './components/Footer';
import Signup from './components/Signup';
import OrderHistory from './components/OrderHistory';
// import Dashboard from './components/';
import DProfil from './components/admin/DProfile.jsx'; // Import DProfile component
import Searchpage from './components/searchpage.jsx'; // Import Searchpage component
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import ManageUsers from './components/admin/ManageUsers.jsx'; // Import ManageUsers component
import Appp from './poll/Appp.jsx'; // Import Appp component
import Userdashbord from './components/userdashbord.jsx'; // Import Dashboardu component
import Chatbot from './components/Chatbot.jsx'; // Import Chatbot component

// // poll page
// import ProductCard from './poll/ProductCard';
// import CompareBar from './poll/CompareBar';
// import ComparePage from './poll/ComparePage';
// import { useState } from 'react';



import { Navigate } from 'react-router-dom';
// import ManageProducts from './components/manageorders.jsx';


const App = () => {
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // poll page
  // const [compareList, setCompareList] = useState([]);
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/ManageUsers" element={<ManageUsers />} />
           <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/welcome" element={<Welcome />} /> 
           <Route path="/order-history" element={<OrderHistory />} />
           {/* <Route path="/dashboard" element={<Dashboard />} /> */}
           <Route path="/search" element={<Searchpage />} />
          <Route path="/DProfile" element={<DProfil />} /> 
          <Route path="/admin" element={<AdminDashboard />} /> 
          
          <Route path="/userDashbord" element={<Userdashbord  />} /> 
          
          {/* <Route path="/admin" element={currentUser?.role === "admin" ? <ManageUsers currentUser={currentUser} /> : <Navigate to="/dashboard" />} />  */}
          

        

        </Routes>
         <Chatbot />
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
