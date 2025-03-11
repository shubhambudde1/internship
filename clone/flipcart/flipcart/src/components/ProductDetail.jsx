import React, { useState } from "react";
import { FaShoppingCart, FaTag, FaInfoCircle, FaStar } from "react-icons/fa";
import { colors, sizes } from '../data/productData';
import { Star } from 'lucide-react';
import dummyProducts from './Catagery/dummyProducts';

// Reviews Component
function Reviews({ reviews }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                }
              />
            ))}
          </div>
          <p className="text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

const ProductDetail = ({ productId }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const product = dummyProducts.find(p => p.id === productId);
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleAddReview = () => {
    setReviews([newReview, ...reviews]);
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="w-2 h-full min-h-screen p-6 bg-gray-100">
      {/* Product Image and Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 ">
          <img
            src={colors[selectedColor].image}
            alt="Selected Product"
            className="w-[430px] h-auto rounded-lg shadow-md"
          />
          <div className="flex gap-2 mt-4">
            {colors.map((color, index) => (
              <img
                key={index}
                src={color.image}
                alt={color.name}
                className={`w-20 h-24 rounded-lg cursor-pointer border ${
                  selectedColor === index ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedColor(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 ml-[-150px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★</span>
            <span className="text-gray-700">4.2</span>
            <span className="text-gray-500">(178 ratings and 5 reviews)</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Color</h2>
            <div className="flex gap-2 mt-2">
              {colors.map((color, index) => (
                <img
                  key={index}
                  src={color.image}
                  alt={color.name}
                  className={`w-20 h-24 rounded-lg cursor-pointer border ${
                    selectedColor === index ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedColor(index)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Size</h2>
            <div className="flex gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 bg-white border rounded-md text-gray-700 ${
                    selectedSize === size ? "border-blue-500 bg-blue-100" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
              <a href="#" className="text-blue-500 underline ml-2">Size Chart</a>
            </div>
          </div>

          <div className="mt-6 w-full">
            <h2 className="text-lg font-semibold text-gray-700">Available Offers</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 w-full">
              <li className="w-full">Bank Offer: 5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C</li>
              <li className="w-full">Bank Offer: 10% off up to ₹1,250 on Axis Bank Credit Card (incl. migrated ones) EMI Txs of ₹499 and above T&C</li>
              <li className="w-full">Bank Offer: 10% off up to ₹1,250 on Flipkart Axis Bank Credit Card EMI Txs, on orders of ₹7,499 and above T&C</li>
              <li className="w-full">Special Price: Get extra 50% off (price inclusive of cashback/coupon) T&C</li>
            </ul>
            <p className="text-blue-500 mt-2">+8 more offers</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
              ADD TO CART
            </button>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
              BUY NOW
            </button>
          </div>

          <div className="mt-4 text-gray-600">
            <span>Deliver to: </span>
            <a href="#" className="text-blue-500 underline">Enter delivery pincode</a> | 
            <span className="ml-2">Check</span>
          </div>
          <div className="mt-2 text-gray-600">
            <span>Cash on Delivery available </span>
            <span className="text-blue-500">?</span>
          </div>
          <Reviews reviews={reviews} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Add atr5656676767 Review</h2>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={30}
                  className={
                    i < newReview.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  }
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                />
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddReview}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
