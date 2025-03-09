// src/App.jsx (or your main app file)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Catagery/ProductList.jsx';
import ProductDetail from './components/Catagery/ProductDetail.jsx';
import CartPage from './components/Catagery/CartPage.jsx';
import Main from './components/Main';
import { CartProvider } from './components/Catagery/CartContext.jsx';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
