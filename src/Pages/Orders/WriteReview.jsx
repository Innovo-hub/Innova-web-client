import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function WriteReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Review header */}
        <div className="mb-8">
          <h2 className="text-xl font-medium">Review</h2>
        </div>
        
        {/* Main content with responsive width */}
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product image and how was the item */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
              <img 
                src="/assets/Orders/image1.png" 
                alt="Product" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" font-size="14" text-anchor="middle" alignment-baseline="middle" font-family="Arial" fill="%23999">Image</text></svg>';
                }}
              />
            </div>
            
            <h3 className="text-xl font-medium text-center sm:text-left">How was the item?</h3>
          </div>
          
          {/* Star rating */}
          <div className="flex justify-center sm:justify-start space-x-2 mb-4">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar 
                    className="w-6 h-6"
                    color={(hover || rating) >= ratingValue ? "#FFD700" : "#e4e5e9"}
                  />
                </button>
              );
            })}
          </div>
          
          {/* Review text prompt */}
          <p className="text-sm text-gray-600 mb-3">Write a review</p>
          
          {/* Review text input - reduced height */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What Should other Customers Know !"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          
          {/* Submit button */}
          <div className="mt-4 flex justify-end w-full">
            <button
              className="px-4 py-2 bg-[#126090] text-white rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#126090] focus:ring-offset-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
      <CopyRights />
    </div>
  );
}

export default WriteReview;