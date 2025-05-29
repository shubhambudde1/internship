import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';


const addAllToCartDB = async (items, userId) => {
  try {
    await axios.post('http://localhost:5001/api/cart/add-all', {
      user_id: userId,
      items: items
    });
 toast.success('All cart items added to database!');
  } catch (err) {
 toast.error('Failed to add all items to database.');
  }
};

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const cartItems = state.cart; // or adjust according to your state structure
  const userId = 1; // Replace with actual user id from auth context or props

  useEffect(() => {
    addAllToCartDB(cartItems, userId);
  }, [cartItems, userId]);

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
                <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-grow pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                        <p className="text-gray-800 font-semibold mt-1">${item.price}</p>
                        <p className="text-gray-500 text-sm">
                          Size: {item.selectedSize}, Color: {item.colors && item.colors[item.selectedColor] ? item.colors[item.selectedColor].name : 'N/A'}
                        </p>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/2 m-20">
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
                <span>- ${cartItems.reduce((acc, curr) => acc + curr.price * 0.1, 0).toFixed(2)}</span>
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
                <span className="line-through text-gray-400">$2.40</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>${cartItems.reduce((acc, curr) => acc + curr.price * 0.9, 0).toFixed(2)}</span>
            </div>
            <p className="mt-2 text-green-600 font-medium">
              You will save ₹6,824 on this order
            </p>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 squared-full  mt-4 w-full "
 onClick={() => {
 toast.success('Proceeding to checkout!');
 window.location.href = '/checkout';
 }}
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
