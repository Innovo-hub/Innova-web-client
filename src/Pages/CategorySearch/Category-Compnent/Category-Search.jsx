import { useState } from "react";
import PropTypes from "prop-types";
import APILINK from "../../../../Constants";

function CategorySearch() {
  const [searchParams, setSearchParams] = useState({
    name: "",
    from: "",
    to: "",
    location: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { from, to, location } = searchParams;
      const response = await fetch(
        `${APILINK}/api/Product/productsSearchFilter?from=${from}&to=${to}&location=${location}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-main-color rounded-br-[70px] py-10 w-full text-white">
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:space-y-0 space-y-3 px-10">
        <div className="flex px-8">
          <input
            name="name"
            value={searchParams.name}
            onChange={handleInputChange}
            className="rounded-2xl text-black outline-none p-2 ps-5 w-full"
            placeholder="Search by name"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <label>range price from</label>
            <input
              name="from"
              value={searchParams.from}
              onChange={handleInputChange}
              className="rounded-lg text-black outline-none p-2 w-1/2"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label>range price to</label>
            <input
              name="to"
              value={searchParams.to}
              onChange={handleInputChange}
              className="rounded-lg text-black outline-none p-2 w-1/2"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label>Location</label>
          <input
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            className="rounded-lg text-black outline-none p-2 w-full"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleSearch}
          className="bg-white text-main-color px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Search Results Popup */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-6xl max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowResults(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-main-color">
              Search Results
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-color"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {product.ProductName}
                      </h3>

                      <div className="mb-3">
                        <p className="text-gray-600">
                          <span className="font-medium">Author:</span>{" "}
                          {product.ProductAuthor}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-main-color font-bold text-xl">
                            ${product.ProductPriceAfterDiscount.toFixed(2)}
                          </span>
                          {product.ProductPriceBeforeDiscount !==
                            product.ProductPriceAfterDiscount && (
                            <span className="text-gray-500 line-through">
                              ${product.ProductPriceBeforeDiscount.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            product.ProductStatus.includes("In stock")
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.ProductStatus}
                        </span>
                        <button className="bg-main-color text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl text-gray-600">No products found</p>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

CategorySearch.propTypes = {
  // Add prop types if needed
};

export default CategorySearch;
