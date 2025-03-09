import React, { useState, useEffect } from "react";
import { dummyProducts } from '../Catagery/dummyProducts';
import ProductCard from '../Catagery/ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  const filterByCategory = (category) => {
    if (category === 'fashion') {
      return dummyProducts.filter((product) => product.category === 'fashion');
    }
    return dummyProducts.filter((product) => product.category.toLowerCase() === category);
  };

  useEffect(() => {
    const category = localStorage.getItem('category');
    setProducts(filterByCategory(category));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Product Grid</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
