import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// RecommendedProductsPurchased.jsx

const RecommendedProductsPurchased = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(category)


  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/recommendPurchased/${category}`);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching recommended products:', err);
        setError('Failed to fetch recommended products');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchRecommendedProducts();
    }
  }, [category]);


  if (loading) return <p>Loading recommended products...</p>;
  if (error) return <p>{error}</p>;

  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h2>
      <div className="flex overflow-x-auto gap-4 py-2">
        {products.map((product) => {
          if (!product || !product.image || !product.name || !product.price) {
            console.error("Invalid product data:", product);
            return null; // Skip rendering this product
          }
          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex-none w-64">
              <Link to={`/product/${product.id}`}>
                <img src="https://picsum.photos/id/237/200/300" alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProductsPurchased;
