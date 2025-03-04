import React from 'react';
import Header from './Header';
import ProductList from './ProductList';

const Main = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <Header />

      {/* Category Navigation Bar */}
      <nav className="bg-white h-[70px] w-full flex justify-center gap-x-20 px-4 pb-20 border-b-2 border-gray-200 ">

        {/* Category Items */}
        {[
          { label: 'Kilos', icon: '🧼' },
          { label: 'Mobiles', icon: '📱' },
          { label: 'Fashion', icon: '👗' },
          { label: 'Electronics', icon: '💻' },
          { label: 'Home & Furniture', icon: '🛋️' },
          { label: 'Appliances', icon: '🍳' },
          { label: 'Flight Bookings', icon: '✈️' },
          { label: 'Beauty, Toys & More', icon: '🧸' },
          { label: 'Two Wheelers', icon: '🏍️' },
        ].map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-[24px]">{category.icon}</span>
            <span className="text-[#212121] font-sans font-medium text-[12px] mt-1">{category.label}</span>
          </div>
        ))}
      </nav>

      {/* Main Banner Section */}
      <section className="bg-gradient-to-r from-[#004AAD] to-[#007BFF] h-[300px] w-full flex justify-center items-center relative">
        {/* Carousel Arrows */}
        <button className="absolute left-4 w-[40px] h-[40px] bg-white rounded-[5px] flex justify-center items-center">
          <span className="text-gray-600">←</span>
        </button>
        <button className="absolute right-4 w-[40px] h-[40px] bg-white rounded-[5px] flex justify-center items-center">
          <span className="text-gray-600">→</span>
        </button>

        {/* Main Content */}
        <div className="text-center">
         

          {/* Promotional Text */}
          <h2 className="text-white font-sans font-bold text-[24px] mt-4">Top 100 Earphone From ₹699</h2>
          <p className="text-[#D0D0D0] font-sans text-[16px]">boAt, realme & more — Grab or Gone</p>

          {/* Badges */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="bg-yellow-400 text-blue-900 font-sans uppercase text-[14px] px-4 py-2 rounded-full border-2 border-blue-600">
              BIG BACHAT DAYS
            </div>
            <div className="flex items-center space-x-2 text-white font-sans text-[12px]">
              <span>10% Instant Discount on Credit Cards</span>
              <div className="flex space-x-1">
                <span>💳</span> {/* Replace with actual bank icons */}
                <span>💳</span>
                <span>💳</span>
                <span>💳</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <ProductCard /> */}
      <ProductList />
    </div>
  );
};

export default Main;