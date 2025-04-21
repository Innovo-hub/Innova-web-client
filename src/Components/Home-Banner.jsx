import { FaSearch, FaShieldAlt } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

function HomeBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-main-color to-[#1a4f7e] shadow-lg">
      <div className="container mx-auto py-5 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/2">
            <input
              className="w-full rounded-full px-12 py-3 outline-none shadow-md transition-all duration-300 focus:shadow-lg"
              placeholder="Search for products..."
              type="text"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {/* Features */}
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-3 text-white">
              <MdExplore className="text-2xl" />
              <span className="text-lg font-medium">
                Free Product Exploration
              </span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <FaShieldAlt className="text-2xl" />
              <span className="text-lg font-medium">100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
