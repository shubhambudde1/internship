import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <div className="bg-white rounded-lg p-2 mr-[-80px] w-70 h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-lg font-semibold">₹{product.price}</p>
      <p className="text-sm line-through">₹{product.originalPrice}</p>
      <p className="text-green-500">{product.discount}</p>
      <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded">
        {product.tag}
      </span>
      <button
        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
      <button
        className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-2"
        onClick={() => addToWishlist(product)}
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductCard;