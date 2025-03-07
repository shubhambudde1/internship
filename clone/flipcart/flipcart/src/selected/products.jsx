import React from 'react';

const products = [
  {
    name: 'Pack of 1 Pace Intellieaze Men',
    price: 369,
    originalPrice: 449,
    discount: '17% off',
    tag: 'Hot Deal',
    image: '/images/product1.png'
  },
  {
    name: 'Men Solid Round',
    price: 299,
    originalPrice: 749,
    discount: '60% off',
    tag: 'Hot Deal',
    image: '/images/product2.png'
  },
  {
    name: 'Men Regular Fit Checkered Shirt',
    price: 279,
    originalPrice: 1999,
    discount: '86% off',
    tag: 'Hot Deal',
    image: '/images/product3.png'
  },
  {
    name: 'Men Self Design Pullover',
    price: 299,
    originalPrice: 999,
    discount: '70% off',
    tag: 'Only few left',
    image: '/images/product4.png'
  }
];

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <aside className="w-1/4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div>
          <h3 className="font-semibold">Price</h3>
          <input type="range" min="0" max="3000" className="w-full" />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Brand</h3>
          <input
            type="text"
            placeholder="Search Brand"
            className="w-full p-2 border rounded"
          />
          <ul className="mt-2">
            <li><input type="checkbox" /> 18 Edition</li>
            <li><input type="checkbox" /> 3BROS</li>
            <li><input type="checkbox" /> 3colors</li>
            <li><input type="checkbox" /> 72 Degree</li>
          </ul>
        </div>
      </aside>
      <main className="w-3/4 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="font-bold mt-2">{product.name}</h3>
              <p className="text-lg font-semibold">₹{product.price}</p>
              <p className="text-sm line-through">₹{product.originalPrice}</p>
              <p className="text-green-500">{product.discount}</p>
              <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded">
                {product.tag}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
