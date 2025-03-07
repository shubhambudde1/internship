import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import sariImage from '../assets/499Img/sari.jpeg';
import shirt1 from '../assets/499Img/shirt1.jpeg';
import shirt2 from '../assets/499Img/shirt2.jpeg';

const ProductList = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 300; // Width of each product card
  const productsToShow = 3; // Number of products to show at a time

  const handlePrevClick = () => {
    setScrollPosition((prevPosition) => Math.max(prevPosition - cardWidth, 0));
  };

 const handleNextClick = () => {
    setScrollPosition((prevPosition) => Math.min(prevPosition + cardWidth, products.length * cardWidth - productsToShow * cardWidth));
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
     {
      id: 5,
      title: "Shirt 4",
      price: 19.99,
      image: shirt2,
    },
  ];

  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide">
      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        aria-label="Previous Products"
      >
        <FaArrowLeft />
      </button>
      <div
        className="flex transition-transform duration-300 space-x-4 p-4"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[300px]">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        aria-label="Next Products"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ProductList;
