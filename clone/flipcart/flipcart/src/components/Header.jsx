import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from "../assets/profile/p.png"
import Loginprofile from "../assets/profile/images.jpeg"

import { Link } from 'react-router-dom'

function Header() {
  const [showLoging, setShowLoging] = useState(false);

  useEffect(() => {
    const storedShowLogin = localStorage.getItem('showLogin');
    if (storedShowLogin) {
      setShowLoging(JSON.parse(storedShowLogin));
    }
  }, []);


  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery) {
        navigate(`/search?q=${searchQuery}`);
      }
    }
  };
  return (
    <>
    <header className="bg-white h-[60px] w-full  flex items-center justify-between px-4 border-b-2 border-gray-200 sticky top-0 p-9 mb-7">
        {/* Logo */}
        <Link to="/">
          <div className="flex flex-col pr-40">
            <span className="text-[#2874F0] font-sans font-bold text-[20px]">Flipkart</span>
            <span className="text-[#FDBA12] font-sans italic text-[12px]">Explore Plus</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for Products, Brands and More"
            className="w-[500px] h-[40px] rounded-[5px] border-none bg-gray-100 text-[#828282] font-sans text-[14px] px-4"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Login Button */}
          <div className="relative group">
            <Link to="/login">
              <button className="bg-[#2874F0] text-white font-sans font-bold text-[14px] px-[20px] py-[10px] rounded-[5px] hover:bg-[#1a5dc4] flex items-center mr-14">
                Login
                <span className="ml-2">▼</span>
              </button>
            </Link>
            {/* Dropdown can be added here */}
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-1">
            <svg
              className="w-[20px] h-[20px] text-[#212121]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h14l-2-8M10 16a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z"
              />
            </svg>
            <Link
              to="/cart"
              className="relative text-[#212121] font-sans text-[14px] mr-14"
            >
              Cart
              <span
                className="absolute top-[-7px] right-[-15px] bg-transparent text-black font-sans font-bold text-[12px] px-[6px] py-[2px] rounded-[5px] ml-12"
              >
                {JSON.parse(localStorage.getItem('cart') || '[]').length}
              </span>
            </Link>
          </div>

          {/* Become a Seller */}
          <a href="#" className="text-[#212121] font-sans text-[14px] mr-14">
            Become a Seller
          </a>
          {/* profile image */}
          <div className="flex items-center">
            <Link to="/dashboard">
              <img
                src={showLoging ? Loginprofile : profile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
