import React from "react";
import explore1 from "../../../assets/Products/prod4.png";
import explore2 from "../../../assets/Products/image-12.png";
import explore3 from "../../../assets/Products/image-13.png";
import explore4 from "../../../assets/Products/explore4.png";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function ExploreProducts() {
    return (
      <div>
        <div className="my-16 lg:px-24 px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Explore Other Products
            </h2>
            <p className="text-gray-600">
              Discover our unique collection of handcrafted products
            </p>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 mt-8 gap-8">
            <div className="col-span-1 h-[500px] group">
              <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={explore1}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Explore 1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-xl font-semibold">
                    Handcrafted Collection
                  </h3>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 col-span-1 space-y-6">
              <div className="h-[242px] group">
                <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={explore2}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Explore 2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white text-lg font-semibold">
                      Artistic Designs
                    </h3>
                  </div>
                </div>
              </div>
              <div className="h-[242px] group">
                <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <img
                    src={explore3}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Explore 3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white text-lg font-semibold">
                      Unique Pieces
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative col-span-1 h-[500px] group">
              <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={explore4}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Explore 4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center transition-all duration-300">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-2xl font-bold mb-4">
                      Special Collection
                    </h3>
                    <Link className="inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                      Explore Now <NavigateNextIcon className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default ExploreProducts;
