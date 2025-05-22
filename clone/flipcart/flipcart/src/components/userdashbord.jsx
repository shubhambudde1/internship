import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboardu from "./UserDashbord/Dashbord";
import Userd from "./UserDashbord/Userd";

import { Tooltip } from 'react-tooltip'


const Userdashbord = () => {

    const [showcoupons, setShowcoupons] = useState(false);
    const [showUser, setshowUser] = useState(false);

  return (
    <div
      className={"bg-white text-black min-h-screen flex"
      }
    >
      {/* Sidebar */}
      <div className="w-1/6  border-r border-gray-300  bg-blue-500 pt-25">
        <div className="flex flex-col space-y-4 left-5 z-[1]">
        <div id="full" className="w-full border-b border-gray-600 "></div>
          <button
            className="px-2 py-2  rounded italic text-white hover:bg-blue-400 hover:text-white"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
             onClick={() => setShowcoupons(!showcoupons)}
           
          >
            <Tooltip id="add-product-tooltip" content="Add a new product to the inventory" />
          purchace and coupons
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4 rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            onClick={() => setshowUser(!showUser)}
            
          >
            <Tooltip id="manage-orders-tooltip" content="View and manage all orders" />
                  User Management
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
          >
            <Tooltip id="users-tooltip" content="Manage all users" />
      
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            data-tooltip-id="analytics-tooltip"
            data-tooltip-content="View sales and user analytics"
            data-tooltip-place="right"
            data-tooltip-variant="light"
            data-tooltip-delay-show={200}
            data-tooltip-delay-hide={200}
            data-tooltip-float={true}
          >
            <Tooltip id="analytics-tooltip" content="View sales and user analytics" />
            {/* Analytics */}
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
            
          >
         {/* Reviews */}
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
           
          >
           {/* Paymethod */}
          </button>
      
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
          
          >
           {/* reports */}
          </button>
    
          
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
         
          >

          {/* return  */}
          </button>
          <div className="border-b border-gray-600 "></div>

          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
         
          >
         {/* seller_admin */}
          </button>
          <div className="border-b border-gray-600 "></div>

          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
      
          >
         {/* inventry */}
          </button>
          <div className="border-b border-gray-600 "></div>

          
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
        
          >
         {/* CustomerManagement  */}
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
          
          >
       {/* coupons */}
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
          
          >
       {/* showReturnOrder */}
          </button>
          <div className="border-b border-gray-600 "></div>
          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
          
          >
       {/* routeR_view */}
          </button>
          <div className="border-b border-gray-600 "></div>

          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
        
          >
                       {/* Recommend */}
          </button>
          <div className="border-b border-gray-600 "></div>

          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
           
          >
                       {/* DynamicProduct */}
          </button>
          <div className="border-b border-gray-600 "></div>

          <button
            className="px-4  rounded italic text-white hover:bg-gray-800 hover:bg-gray-200 p-2"
            style={{ fontStyle: "italic", fontFamily: "cursive" }}
           
          >
                       {/* QASection */}
          </button>
          <div className="border-b border-gray-600 "></div>

        </div>
      </div>
      {/* Main Content */}
      <div className="p-6 w-5/6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="relative inline-block w-14 h-8">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="opacity-0 w-0 h-0"
          
            />
            <label
              htmlFor="darkModeToggle"
              className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition-colors duration-300"
            >
              <span
                className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ${
              "translate-x-1"
                }`}
              ></span>
            </label>
          </div>
        </div>
        <Tooltip id="dark-mode-tooltip" content="Toggle dark mode" />
{/* 

        {Showtable && <ManageProducts1 />} */}

        {/* Highlight low stock products
        {products.some(product => product.stock < 30) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Low Stock Alert!</strong>
            <span className="block sm:inline">
              The following products are running low on stock:
              {products
                .filter(product => product.stock < 30)
                .map(product => product.name)
                .join(', ')}
            </span>
          </div>
        )} */}


        {/* {product && <OrderHistry />}

        <ToastContainer />
      

        {users && <ManageUsers />}
        {analytics && <Analysis />}
        {Reviews && <ManageReviews />}
        {showpaymentMethods && <PaymentMethods />}
        {reports && <Reports />}
        {ReturnReqshow && <ReturnReq />}
        {showsellerManage && <SellerManagement />}
        {InventoryManagement && <InventoryManage/>}
        {showCustomer && <CustomerManagement/>}
        {showcoupons && <CouponManagement/>}
        {showReturnOrder && <ReturnsManagement/>}
        {showRview && <RecentlyViewed userId={1}/>}
        {showRecommend && <RecommendedProducts userId={21}/>}
        {showDynamicProduct && <DynamicProduct />}
        {showQASection && <QASection productId={1} userId={1} />} */}
        {showcoupons && <Dashboardu />}
        {showUser && <Userd user={2} />}
        {/* Add more components as needed */}


      </div>
    </div>
  );
};


export default Userdashbord;
