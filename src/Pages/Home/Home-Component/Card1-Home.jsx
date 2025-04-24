import React from "react";
import la2 from "../../../assets/HomeAssets/la1.jpg";

function Card1Home() {
    return (
      <div className="bg-gradient-to-r from-white via-gray-50 to-gray-200 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Crafted with <span className="text-blue-700">Heart</span>
                </h2>
                <div className="w-20 h-1 bg-blue-700"></div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every piece we create tells a unique story of passion and
                dedication. Our artisans pour their soul into crafting timeless
                pieces that blend traditional techniques with modern elegance.
                Each creation is a testament to our commitment to excellence and
                attention to detail.
              </p>
              <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold text-blue-700 italic">
                  &ldquo;Where tradition meets innovation, and quality becomes
                  art&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-700/70"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-700/40"></div>
                  </div>
                  <span className="text-gray-500 font-medium">
                    Handcrafted Excellence
                  </span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={la2}
                  alt="Handcrafted Artistry"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm font-light">
                    Discover the Art of Craftsmanship
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-700/10 rounded-full transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Card1Home;

