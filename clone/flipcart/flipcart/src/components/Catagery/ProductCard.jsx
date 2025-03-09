import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

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
    <>
      
    <div className="bg-white rounded-lg p-2 mr-[-80px] w-70 h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        />
{product.isBestseller && (
  <span className="inline-block bg-yellow-200 text-yellow-700 px-2 py-1 rounded mt-2">
    Bestseller
  </span>
)}

      <h3 className="font-bold mt-2">{product.name}</h3>
      <p className="text-sm line-through">
        ₹{Math.floor(Math.random() * (product.price + 500 - product.price + 1)) + product.price}
      </p>
      <p className="text-lg font-semibold">₹{product.price}</p>
      <div className="flex items-center gap-2">
      <p className="text-green-500">{product.offer}</p>
      <div className="flex items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L6.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-gray-600 ml-2">{product.rating || '4.5'}</span>
      </div>

      </div>
      <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded">
        {product.tag} {Math.floor(Math.random() * 100)}
      </span>
      <button
        className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full m-2"
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
     
        </>
  );
};

export default ProductCard;