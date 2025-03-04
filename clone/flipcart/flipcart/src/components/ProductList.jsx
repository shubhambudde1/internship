import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import sariImage from '../assets/499Img/sari.jpeg';
import shirt1 from '../assets/499Img/shirt1.jpeg';
import shirt2 from '../assets/499Img/shirt2.jpeg';

const ProductList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    console.log('Previous button clicked');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    console.log('Next button clicked');
    setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
  };

  // Sample product data (replace with your actual data source)
  const products = [
    {
      id: 1,
      title: "Sari",
      price: 29.99,
      image: sariImage, // Use the imported image
    },
    {
      id: 1,
      title: "Sari",
      price: 29.99,
      image: sariImage, // Use the imported image
    },
    {
      id: 1,
      title: "Sari",
      price: 29.99,
      image: sariImage, // Use the imported image
    },
    {
      id: 2,
      title: "Shirt 1",
      price: 39.99,
      image: shirt1,
    },
    {
      id: 3,
      title: "Shirt 2",
      price: 19.99,
      image: shirt2,
    },
    {
      id: 4,
      title: "Shirt 3",
      price: 19.99,
      image: shirt2,
    },
  ];

  console.log('Current Index:', currentIndex);
  console.log('Products:', products);

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);
  if (visibleProducts.length < 4) {
    visibleProducts.push(...products.slice(0, 4 - visibleProducts.length));
  }

  return (
    <div className="relative">
      <button onClick={handlePrevClick} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        <FaArrowLeft />
      </button>
      <div className="flex overflow-hidden space-x-4 p-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <button onClick={handleNextClick} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ProductList;