import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Star } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dummyProducts from './dummyProducts';
import { CartContext } from './CartContext';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = dummyProducts.find((product) => product.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const { dispatch } = useContext(CartContext);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: product.rating, comment: "" });
  const [customerName, setCustomerName] = useState('');
  

  useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
    }
  }, [product]);
  

  const handleAddReview = async () => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview({ rating: 0, comment: "" });
    
    const updatedProduct = { ...product, reviews: updatedReviews };
    const productIndex = dummyProducts.findIndex((p) => p.id === product.id);
    dummyProducts.splice(productIndex, 1, updatedProduct);
    localStorage.setItem('products', JSON.stringify(dummyProducts));
    
      try {
        const reviewWithCustomerName = { ...newReview, customerName: customerName };
        setCustomerName('');
        const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const reviewIndex = existingReviews.findIndex((review) => review.productID === product.id);
        if (reviewIndex !== -1) {
          existingReviews[reviewIndex].reviews.push(reviewWithCustomerName);
          
        } else {
          const currentTimestamp = new Date().toISOString();
          const productReviewWithDate = { productID: product.id, productName: product.name, date: currentTimestamp, reviews: [reviewWithCustomerName] };
          existingReviews.push(productReviewWithDate);
        }
        localStorage.setItem('reviews', JSON.stringify(existingReviews));
        console.log('Reviews saved to localStorage:', existingReviews);
        try {
          const response = await axios.post('http://localhost:5001/api/returnr', existingReviews);
          console.log('Reviews saved to database:', response.data);
          
        } catch (error) {
          console.error('Failed to save reviews to database:', error);
          
        }


      } catch (error) {
        console.error('Failed to save reviews to localStorage:', error);
      }
    }


  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, selectedColor, selectedSize }
    });
    alert('Product added to cart');
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <>
        
    <div className="w-full h-full min-h-screen p-6 bg-gray-100 ">
      {/* Product Image and Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-7">
          <img src={product.image} alt={product.name} className="w-[400px] h-[500px] object-cover rounded-t-lg" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
         

          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Color</h2>
            <div className="flex gap-2 mt-2">
              {product.colors && product.colors.map((color, index) => (
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
              {product.sizes && product.sizes.map((size) => (
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
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
              onClick={handleAddToCart}
              >
              ADD TO CART
            </button>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
            <a href="#" className="text-white">
            BUY NOW
          </a>
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
          <div className="mt-4">
            <h2 className="flex items-center gap-2">
              REVIEWS ({reviews.length + 3})
              <div className="flex items-center gap-0.3">

              <span className="font-semibold text-black">{product.rating}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L6.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              </div>
              <span className="text-blue-500 cursor-pointer" onClick={() => document.getElementById('reviewForm').style.display = 'block'}>add reviews</span>
            </h2>
          </div>
            <div id="reviewForm" style={{ display: 'none' }}>
          <div className="flex items-center gap-2 mb-4">
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
          <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border-2 border-gray-300 rounded-md p-2 mb-4"
            />

          <div className="mt-4">
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Write a review..." 
              className="w-full h-24 border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
              onClick={handleAddReview}
            >
              ADD REVIEW
            </button>
          </div>
        </div>
        {/* // Display the reviews below the review form */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          <div className="mb-4 p-4 border rounded shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < 5 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  }
                />
              ))}
            </div>

            <p className="text-gray-600"> This product is amazing! Highly recommend it to everyone.</p>
          </div>
          <div className="mb-4 p-4 border rounded shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < 5 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  }
                />
              ))}
            </div>

            <p className="text-gray-600"> Highly recommend it to everyone.</p>
          </div>
          <div className="mb-4 p-4 border rounded shadow-sm">
            <div className="flex items-center mb-2">
              {[...Array(2)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < 5 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  }
                />
              ))}
            </div>

            <p className="text-gray-600"> default in packeding</p>
          </div>

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
        
        </div>
        
      </div>
    </div>
   
              </>
  );
};

export default ProductDetail;
