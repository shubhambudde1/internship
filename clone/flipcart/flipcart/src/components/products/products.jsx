import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";
import { dummyProducts } from '../Catagery/dummyProducts';
import ProductCard from '../Catagery/ProductCard';

const ProductCards = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      {product.isBestseller && (
        <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">Bestseller</span>
      )}
      <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
      <p className="text-lg text-gray-700">{product.price}</p>
      <p className="text-sm text-green-500">{product.offer}</p>
      {/*
      <div className="flex items-center mt-2">
        <Star className="text-yellow-500 w-5 h-5" />
        <span className="ml-1 text-gray-600">{product.rating}</span>
      </div>
      */}
    </div>
  );
};

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
