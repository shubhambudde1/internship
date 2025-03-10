import React, { useState, useEffect } from "react";
import { dummyProducts } from '../Catagery/dummyProducts';
import ProductCard from '../Catagery/ProductCard';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  const filterByCategory = (category) => {
    if (category === 'fashion') {
      return dummyProducts.filter((product) => product.category.toLowerCase() === 'fashion');
    }
    return dummyProducts.filter((product) => product.category.toLowerCase() === category);
  };

  useEffect(() => {
    const category = localStorage.getItem('category');
    setProducts(filterByCategory(category));
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">mobile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {products.map((product, index) => (
            <Link key={index} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Electronics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {dummyProducts.filter((product) => product.category.toLowerCase() === 'electronics').map((product, index) => (
            <Link key={index} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
