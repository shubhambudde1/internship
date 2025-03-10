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

import Footer from './components/Footer';

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
          <Route path="/cart" element={<CartPage />} />
          
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
