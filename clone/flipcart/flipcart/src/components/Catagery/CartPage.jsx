import React, { useContext } from 'react';
import { CartContext } from './CartContext';


const CartPage = () => {
  const { state } = useContext(CartContext);
  const cartItems = state.cart;

  return (
    <>
     
    <div className="container mx-auto px-4 w-full flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-row">
                <img src={item.image} alt={item.name} className="w-15 h-24 object-cover rounded-t-lg" />
                <div className="pl-14 gap-2">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-800 font-semibold">${item.price}</p>
                 <p className="text-gray-500">
                    Size: {item.selectedSize}, Color: {item.colors && item.colors[item.selectedColor] ? item.colors[item.selectedColor].name : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/2 m-20">
        {/* <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <p className="text-xl font-semibold">
          Total: ${cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
          Checkout
        </button> */}
         <div className="max-w-sm mx-auto bg-white p-4 shadow-lg rounded-2xl">
      <h2 className="text-gray-600 font-semibold mb-4">PRICE DETAILS</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Price ({cartItems.length} items)</span>
          <p className="text-xl text-gray-600">
            ${cartItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Discount</span>
          <span>- ₹6,744</span>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Buy more & save more</span>
          <span>- ₹60</span>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Coupons for you</span>
          <span>- ₹20</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="line-through text-gray-400">₹240</span>
          <span className="text-green-500">Free</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between text-lg font-bold">
      <span>₹6,367</span>
      <spam></spam>

      </div>
      <p className="mt-2 text-green-600 font-medium">
        You will save ₹6,824 on this order
      </p>
      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 squared-full  mt-4 w-full "
        // onClick={() => alert('Checkout functionality is not implemented')}
        onClick={() => window.location.href = '/checkout'}
      >
        Checkout
      </button>
    </div>

      </div>
    </div>
     
        </>
  );
};

export default CartPage;
