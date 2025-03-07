import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

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
                    Size: {item.selectedSize}, Color: {item.colors[item.selectedColor].name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/2 m-20">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <p className="text-xl font-semibold">
          Total: ${cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
