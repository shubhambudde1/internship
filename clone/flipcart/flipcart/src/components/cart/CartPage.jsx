import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const updateQuantity = (index, quantity) => {
    const newCart = [...cartItems];
    newCart[index].quantity = quantity;
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 w-full flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-row">
                <img src={item.image} alt={item.name} className="w-10 h-14 object-cover rounded-t-lg" />
                <div className="p-4 flex flex-row gap-2">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-800 font-semibold">${item.price}</p>
                  <p className="text-gray-500">
                    Size: {item.selectedSize}, Color: {item.colors[item.selectedColor]?.name}
                  </p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    className="border rounded p-1 w-16"
                  />
                  <button
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-2"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/2 m-20">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <p className="text-xl font-semibold">
          Total: ${getTotalPrice()}
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={() => toast.success("Order Completed")}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
