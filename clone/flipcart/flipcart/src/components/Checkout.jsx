// src/components/Checkout.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  // Ensure price and quantity are numbers
  const cartItems = cart.map((item) => ({
    ...item,
    price: parseFloat(item.price),
    quantity: parseInt(item.quantity, 10),
  }));

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return total + itemTotal;
  }, 0);

  const handlePlaceOrder = async () => {
    const newOrder = {
      date: new Date(),
      status: 'Pending',
      items: cartItems,
      products: JSON.stringify(cartItems.map(item => item.id)), // Convert product IDs to JSON string
      totalCost: totalPrice,
      name: name,
      address: address,
      phone: phone,
      paymentMethod: paymentMethod,
    };
    console.log('New Order:', newOrder);

    const rewardLoyelty = {
      date: new Date(),
      user_id: 1, // Replace with actual user ID
      type: 'purchase', // Trimmed value
      points: Math.floor(totalPrice / 1000) * 50,
      description: `Purchase worth $${totalPrice}`,
    };

    try {
      // Send the order to the backend
      const response = await axios.post('http://localhost:5001/api/orders', newOrder);
      console.log('Order placed successfully:', response.data);

      if (response.status === 200 || response.status === 201) {
        // Retrieve existing orders from localStorage
        const existingOrders = JSON.parse(localStorage.getItem('allOrders')) || [];

        // Add the new order to the array
        existingOrders.push(newOrder);

        // Store the updated array back in localStorage
        localStorage.setItem('allOrders', JSON.stringify(existingOrders));

        // Store the current order and products separately
        localStorage.setItem('lastOrder', JSON.stringify(newOrder));
        localStorage.setItem('orderedProducts', JSON.stringify(cartItems)); // Store products in localStorage

        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear the cart
        window.location.href = '/'; // Redirect to the home page
      } else {
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }

    try {
      const rewardResponse = await axios.post('http://localhost:5001/api/rewardLoyelty', rewardLoyelty);
      if (rewardResponse.status === 200 || rewardResponse.status === 201) {
        console.log('Loyalty points rewarded successfully:', rewardResponse.data);
      } else {
        console.error('Failed to reward loyalty points:', rewardResponse);
        alert('Failed to reward loyalty points. Please contact support.');
      }
    } catch (error) {
      console.error('Error rewarding loyalty points:', error);
      alert('An error occurred while rewarding loyalty points.');
    }
  };

  return (
    <div className="checkout-page container mx-auto mt-5 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Shipping Information Section */}
        <div className="md:w-8/12">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b pb-4">
              <h4 className="text-xl font-semibold">Shipping Information</h4>
            </div>
            <div className="mt-4">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="payment" className="block text-gray-700 text-sm font-bold mb-2">
                    Payment Method
                  </label>
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="payment"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>Cash on Delivery</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="md:w-4/12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="border-b pb-4">
              <h4 className="text-xl font-semibold">Order Summary</h4>
            </div>
            <div className="mt-4">
              <p>Selected Products:</p>
              <ul className="list-inside pl-4 space-y-2">
                {cartItems.map((item, index) => (
                  <li key={index} className="text-gray-800">
                    <span className="font-semibold">{item.name}</span> -{' '}
                    <span className="text-green-600">${item.price.toFixed(2)}</span> x{' '}
                    <span className="text-blue-600">{item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">
                Total Price: ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="mt-2">Delivery Details: [Delivery details will be displayed here]</p>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
