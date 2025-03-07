import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, image }) => {
  return (
    <div className="border  rounded-lg shadow-md transition duration-300 hover:shadow-xl">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600">${price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
