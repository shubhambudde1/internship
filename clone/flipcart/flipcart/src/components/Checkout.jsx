// src/components/Checkout.jsx
import React from 'react';

function Checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const cartItems = cart.map((item) => ({
        ...item,
        quantity: 1
    }));

    const handlePlaceOrder = () => {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            id: orders.length + 1,
            date: new Date(),
            status: 'Pending',
            items: cartItems,
            totalCost: total
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Order placed successfully!');
        // localStorage.removeItem('cart');
       
    };

    return (
        <div className="checkout-page container mx-auto mt-5 p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-8/12">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="border-b pb-4">
                            <h4 className="text-xl font-semibold">Shipping Information</h4>
                        </div>
                        <div className="mt-4">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" placeholder="Enter your address" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                                    <input type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" placeholder="Enter your phone number" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="payment" className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                                    <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="payment">
                                        <option>Credit Card</option>
                                        <option>PayPal</option>
                                        <option>Cash on Delivery</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
                                        <span className="font-semibold">{item.name}</span> - 
                                        <span className="text-green-600">${item.price}</span> x 
                                        <span className="text-blue-600">{item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 font-semibold">Total Price: ${total.toFixed(2)}</p>
                            <p className="mt-2">Delivery Details: [Delivery details will be displayed here]</p>
                        </div>
                        <div className="mt-4">
                            <a href="/order-history" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handlePlaceOrder}>Place Order</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;


