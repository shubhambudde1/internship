import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const DynamicProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch all products from the backend
        fetch('http://localhost:3000')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(err => console.error('Error fetching products:', err));

        // Listen for price updates via WebSocket
        socket.on('priceUpdate', ({ product_id, newPrice }) => {
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.product_id === product_id
                        ? { ...product, dynamic_price: newPrice }
                        : product
                )
            );
        });

        // Cleanup WebSocket listener on component unmount
        return () => {
            socket.off('priceUpdate');
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">Product List</div>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.product_id} className="border rounded-lg shadow-md p-4 bg-gray-50">
                                {/* Product Image */}
                                <img
                                    src={product.image_url || 'https://picsum.photos/id/237/200/300'}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                {/* Product Details */}
                                <div>
                                    <h1 className="block text-lg leading-tight font-medium text-black hover:underline">
                                        {product.name}
                                    </h1>
                                    <p className="mt-2 text-gray-500">Description: {product.description || 'No description available'}</p>
                                    <div className="mt-2">
                                        <p className="text-gray-700 font-bold">Base Price: ₹{product.base_price}</p>
                                        <p className="text-gray-700 font-bold">Dynamic Price: ₹{product.dynamic_price}</p>
                                        {product.price_change_reason && (
                                            <p className="text-orange-500 font-bold">Reason: {product.price_change_reason}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 text-gray-500">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default DynamicProduct;