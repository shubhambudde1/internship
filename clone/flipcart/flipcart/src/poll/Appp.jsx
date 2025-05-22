import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CompareBar from './CompareBar';
import ComparePage from './ComparePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Appp() {
  const [compareList, setCompareList] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <ProductCard compareList={compareList} setCompareList={setCompareList} />
            <CompareBar compareList={compareList} setCompareList={setCompareList} />
          </>
        }/>
        <Route path="/compare" element={<ComparePage compareList={compareList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Appp;
