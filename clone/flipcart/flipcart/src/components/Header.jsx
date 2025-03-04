import React from 'react'

function Header() {
  return (
    <>
    <header className="bg-white h-[60px] w-full  flex items-center justify-between px-4 border-b-2 border-gray-200 sticky top-0 p-9 mb-7">
        {/* Logo */}
        <div className="flex flex-col pr-40">
          <span className="text-[#2874F0] font-sans font-bold text-[20px]">Flipkart</span>
          <span className="text-[#FDBA12] font-sans italic text-[12px]">Explore Plus</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="w-[500px] h-[40px] rounded-[5px] border-none bg-gray-100 text-[#828282] font-sans text-[14px] px-4"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Login Button */}
          <div className="relative group">
            <button className="bg-[#2874F0] text-white font-sans font-bold text-[14px] px-[20px] py-[10px] rounded-[5px] hover:bg-[#1a5dc4] flex items-center mr-14">
              Login
              <span className="ml-2">▼</span>
            </button>
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
            <span className="text-[#212121] font-sans text-[14px] mr-14">Cart</span>
          </div>

          {/* Become a Seller */}
          <a href="#" className="text-[#212121] font-sans text-[14px] mr-14">
            Become a Seller
          </a>
          {/* 3 dots */}
          <div className="flex items-center">
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header