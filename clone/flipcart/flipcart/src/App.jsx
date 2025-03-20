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
import Dashboard from './components/Dashboard';
import DProfil from './components/DProfile.jsx'; // Import DProfile component



const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/DProfile" element={<DProfil />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
