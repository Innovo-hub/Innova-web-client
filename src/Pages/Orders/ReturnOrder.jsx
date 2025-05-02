import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";

function Returnorder() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-grow">
          {/* Return Orders header with Back button on the right */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="text-blue-500 mr-3">
                <InventoryIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
              </div>
              <h2 className="text-xl font-semibold">Return Orders</h2>
            </div>
            <Link
              to="/cart"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft className="mr-2" size={14} />
              <span>Back</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Navigation sidebar on the left */}
            <div className="w-full md:w-64 border-2 border-gray-200 rounded-xl overflow-hidden h-fit shadow-sm">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <Link
                    to="/userProfile/orders"
                    className="w-full flex justify-between items-center hover:text-blue-600 transition-colors"
                  >
                    <span className="font-medium">My Orders</span>
                    <span className="text-gray-400">›</span>
                  </Link>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <Link
                    to="/userProfile/return_order"
                    className="w-full flex justify-between items-center text-blue-600 font-medium"
                  >
                    <span className="font-medium">Return Orders</span>
                    <span className="text-gray-400">›</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Return order details and products on the right */}
            <div className="flex-grow">
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Return order information */}
                <div className="relative px-6 py-4">
                  <div className="flex flex-wrap gap-6 md:gap-12">
                    <div>
                      <p className="text-sm text-gray-600">Return Orders</p>
                      <p className="font-medium">4 August 2024</p>
                    </div>
                  </div>
                  {/* Full-width separator line */}
                  <div className="absolute left-0 right-0 h-px bg-gray-200 bottom-0"></div>
                </div>

                {/* Returned product */}
                <div className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src="/assets/Orders/image1.png"
                        alt="Product"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" font-size="14" text-anchor="middle" alignment-baseline="middle" font-family="Arial" fill="%23999">Image</text></svg>';
                        }}
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-[#126090] mb-1">
                        Lapis Set, Necklace, ring, earrings lightweight
                      </h3>
                      <p className="font-medium mb-3 text-[#126090]">$70.00</p>

                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50 transition-colors">
                          <svg
                            className="w-3 h-3 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                              fill="currentColor"
                            />
                          </svg>
                          Buy it Again
                        </button>

                        <button className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50 transition-colors">
                          <svg
                            className="w-3 h-3 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                              fill="currentColor"
                            />
                          </svg>
                          View your item
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Partial-width separator line */}
                  <div className="w-11/12 mx-auto border-b my-4"></div>
                </div>

                {/* Empty container for future content */}
                <div className="px-6 py-10 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    {/* Content can be added here in the future */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Returnorder;
