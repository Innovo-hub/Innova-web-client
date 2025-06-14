import { FaSearch, FaShieldAlt } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APILINK from "../../Constants";

function HomeBanner() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${APILINK}/api/Product/getAllProducts?page=1&pageSize=10000`
      );
      setProducts(response.data.Products);
      setFilteredProducts(response.data.Products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.ProductName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

            {/* Search Results Dropdown */}
            {searchTerm && filteredProducts.length > 0 && (
              <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.ProductId}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    onClick={() => handleProductClick(product.ProductId)}
                  >
                    <img
                      src={product.ProductHomePicture}
                      alt={product.ProductName}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.ProductName}</p>
                      <p className="text-sm text-gray-600">
                        ${product.ProductPriceAfterDiscount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
