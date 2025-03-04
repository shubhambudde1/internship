// src/App.jsx (or your main app file)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'; 
import Main from './components/Main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from 'react'


// import Nav from './components/nav.jsx'

// function App() {
//   return (
//     <>
//     <Nav />

//     </>
//   )
// }

// export default App

