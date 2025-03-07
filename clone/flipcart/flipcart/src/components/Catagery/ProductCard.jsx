import React from 'react';

const ProductCard = ({ product }) => {
  return (
    
    <div className="bg-white rounded-lg p-2 mr-[-80px] w-70 h-full">
      <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover "
                />
              <h3 className="font-bold mt-2">{product.name}</h3>
              <p className="text-lg font-semibold">₹{product.price}</p>
              <p className="text-sm line-through">₹{product.originalPrice}</p>
              <p className="text-green-500">{product.discount}</p>
              <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded">
                {product.tag}
              </span>
      </div>
    
  );
};

export default ProductCard;