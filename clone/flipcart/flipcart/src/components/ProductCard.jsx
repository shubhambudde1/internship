import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, image }) => {
  return (
    <div className=" shadow-md transition duration-300 hover:shadow-xl p-1">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-68 object-cover  mb-4" />
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 line-through decoration-2">$199</p>
        <p className="text-gray-600">${price}</p>
        <div className="flex items-center text-yellow-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L6.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-600 ml-2">4.5</span>
        </div>
        
      </Link>
    </div>
  );
};

export default ProductCard;
