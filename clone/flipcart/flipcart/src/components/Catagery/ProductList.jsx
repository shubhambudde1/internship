

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { dummyProducts } from './dummyProducts';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const category = localStorage.getItem('category');
    if (category) {
      const filteredProducts = dummyProducts.filter(
        (product) => product.category.toLowerCase() === category
      );
      setProducts(filteredProducts);
    } else {
      setProducts(dummyProducts);
    }
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <aside className="w-1/4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div>
          <h3 className="font-semibold">Price</h3>
          <input
            type="range"
            min="0"
            max="3000"
            className="w-full"
            onChange={(e) => {
              const price = parseInt(e.target.value);
              const filteredProducts = dummyProducts.filter(
                (product) => product.price <= price
              );
              setProducts(filteredProducts);
            }}
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Brand</h3>
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full p-2 border rounded"
          />
          <ul className="mt-2">
            <li>
              <input
                type="checkbox"
                onChange={(e) => {
                  const rating = e.target.checked;
                  const filteredProducts = dummyProducts.filter(
                    (product) => product.rating > (rating ? 4.3 : 0)
                  );
                  setProducts(filteredProducts);
                }}
              />
              Rating grater than 4.3
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(e) => {
                  const offer = e.target.checked;
                  const filteredProducts = dummyProducts.filter(
                    (product) => product.offer >= (offer ? 1 : 0)
                  );
                  setProducts(filteredProducts);
                }}
              />
              Offer
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(e) => {
                  const bestseller = e.target.checked;
                  const filteredProducts = bestseller
                    ? dummyProducts.filter((product) => product.isBestseller)
                    : dummyProducts;
                  setProducts(filteredProducts);
                }}
              />
              Show only Bestseller
            </li>
            
            
          </ul>
        </div>
      </aside>
      <main className="w-3/4 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {products.map((product, index) => (
            <div key={index} className="bg-white shadow ">
              <Link to={`/product/${product.id}`}>
                
              <ProductCard product={product} />
              </Link>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}