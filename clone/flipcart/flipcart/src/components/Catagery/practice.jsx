
import React, { useState, useEffect } from 'react';

function Practices() {
    const [cartItems, setCartItems] = useState([]);

console.log(cartItems);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);
  return (
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
  )
}

export default Practices;