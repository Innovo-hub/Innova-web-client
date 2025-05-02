import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import author from "../../../assets/Products/author.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  AttachMoney,
  CreditCard,
  LocalShipping,
  Replay,
  Star,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { addToCart } from "../../../redux/Slices/Cart-Slice/cartReducer";

function ProductDetailsCard({ product }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);

  // State
  const [isLoved, setIsLoved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [homeImage, setHomeImage] = useState(product?.HomePicture || "");

  if (!product) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  // Product rating info
  const rating = 3.0;
  const reviewCount = 120;
  const ratingDistribution = {
    5: 55,
    4: 25,
    3: 19,
    2: 33,
    1: 30,
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Mohamed Ahmed",
      rating: 4,
      comment: "Very Good Product and Fancy Very Good Product and Fancy",
    },
    {
      id: 2,
      author: "Mohamed Ahmed",
      rating: 4,
      comment: "Very Good Product and Fancy Very Good Product and Fancy",
    },
    {
      id: 3,
      author: "Mohamed Ahmed",
      rating: 4,
      comment: "Very Good Product and Fancy Very Good Product and Fancy",
    },
    {
      id: 4,
      author: "Mohamed Ahmed",
      rating: 4,
      comment: "Very Good Product and Fancy Very Good Product and Fancy",
    },
    {
      id: 5,
      author: "Mohamed Ahmed",
      rating: 4,
      comment: "Very Good Product and Fancy Very Good Product and Fancy",
    },
  ];

  // Handlers
  const handleImageClick = (pic) => {
    setHomeImage(pic);
  };

  const toggleLoved = () => setIsLoved((prev) => !prev);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!dispatch) return;

    dispatch(addToCart({ ProductId: product.ProductId, Quantity: quantity }))
      .unwrap()
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: response.Message || "Product added to cart successfully.",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error || "Failed to add product to cart.",
        });
      });
  };

  // Function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        fontSize="small"
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-6 lg:px-8 py-10">
        {/* Product Images Section */}
        <div>
          <div className="w-full relative pb-4">
            <img
              src={homeImage}
              alt={product.ProductName || "Product Image"}
              className="w-full object-cover"
            />
            <button
              className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition"
              onClick={toggleLoved}
              aria-label={
                isLoved ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isLoved ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon className="hover:text-red-500" />
              )}
            </button>
          </div>
          <div className="flex gap-2 mt-2">
            {product.Pictures?.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt={`${product.ProductName || "Product"} - View ${index + 1}`}
                className="w-20 h-20 object-contain rounded-lg cursor-pointer"
                onClick={() => handleImageClick(pic)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <div className="bg-gray-100 rounded-sm p-6">
            {/* Product Info */}
            <div className="mb-4">
              <h3 className="text-gray-500 text-xl py-2">
                {product.CategoryName || "Category"}
              </h3>
              <h1 className="text-3xl font-semibold mb-2">
                {product.ProductName || "Product Name"}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-lg">{rating.toFixed(1)}</span>
                <div className="flex">{renderStars(rating)}</div>
                <span className="text-gray-700 text-sm">
                  {reviewCount} Rating
                </span>
              </div>
            </div>

            {/* Price and Availability */}
            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-gray-700 text-2xl font-bold">
                  EGP {product.PriceAfterDiscount || 0}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  Inclusive of Tax
                </span>
              </div>

              <div className="mb-4">
                <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-xl rounded-br-full font-bold text-sm">
                  EXPRESS
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  Get it Tomorrow
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Stock Availability
                  <span className="ml-2 text-gray-600 text-sm">
                    {product.Stock || 0}
                  </span>
                </p>
              </div>
            </div>

            {/* Quantity and Cart */}
            <div className="flex items-center gap-2 mb-4">
              {/* Quantity Selector */}
              <div className="border border-[#126090] rounded-md flex items-center w-16">
                <div className="flex flex-col border-r border-[#126090]">
                  <button
                    onClick={increaseQuantity}
                    className="text-[#126090] px-2 py-1 hover:bg-blue-50"
                    aria-label="Increase quantity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={decreaseQuantity}
                    className="text-[#126090] px-2 py-1 border-t border-[#126090] hover:bg-blue-50"
                    aria-label="Decrease quantity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-lg font-bold">{quantity}</span>
                </div>
              </div>
              {/* Add to Cart Button */}
              <button
                className="flex-1 border border-[#126090] rounded-md py-3 text-[#126090] font-medium hover:bg-blue-50 disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={loading || (product.Stock || 0) < 1}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </div>

            <hr className="bg-gray-900 my-4" />

            {/* Payment Info */}
            <div className="p-6 border-2 border-[#126090] rounded-xl text-center my-4 bg-gradient-to-r from-blue-50 to-white hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-white p-3 rounded-full shadow-md">
                  <CreditCard className="text-[#126090] text-3xl" />
                </div>
                <p className="text-[#126090] text-xl font-semibold">
                  Buy with your credit card easily
                </p>
                <p className="text-gray-600 text-sm">
                  Secure payment with SSL encryption
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex justify-between gap-4">
              <div className="group text-center p-5 border-2 border-red-500 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <LocalShipping fontSize="large" className="text-red-500" />
                </div>
                <p className="text-sm mt-2 font-medium text-gray-700 group-hover:text-red-500 transition-colors duration-300">
                  Fast Shipping
                </p>
              </div>
              <div className="group text-center p-5 border-2 border-green-500 rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <Replay fontSize="large" className="text-green-500" />
                </div>
                <p className="text-sm mt-2 font-medium text-gray-700 group-hover:text-green-500 transition-colors duration-300">
                  Low Returns
                </p>
              </div>
              <div className="group text-center p-5 border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <AttachMoney fontSize="large" className="text-blue-500" />
                </div>
                <p className="text-sm mt-2 font-medium text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  Cash Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Author and Product Details */}
        <div>
          {/* Author Info */}
          <div className="mt-6">
            <div className="flex gap-2 p-4 border border-[#126090] rounded-xl">
              <img src={author} className="h-12" alt="Business Owner" />
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold">
                  {product.AuthorName || "Business Owner"}
                </h3>
                <p className="text-gray-500 text-sm">Business Owner</p>
              </div>
            </div>

            {/* Product Overview */}
            <div className="p-6 my-3 border border-[#126090] rounded-xl">
              <h2 className="text-xl text-gray-500">Product Overview</h2>
              <hr className="bg-gray-900 my-2" />

              {/* Highlights */}
              <div className="mb-4">
                <p className="text-gray-500 my-2">Highlights</p>
                <ul className="ps-5 list-disc list-inside text-gray-600">
                  <li>Premium Quality</li>
                  <li>Against Color Change</li>
                </ul>
              </div>

              <hr className="bg-gray-900 my-2" />

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-500 my-2">Description</p>
                <p className="ps-5 text-gray-600">
                  {product.Description || "No description available"}
                </p>
              </div>

              <hr className="bg-gray-900 my-2" />

              {/* Specifications */}
              <div>
                <p className="text-gray-500 mb-2">Specifications</p>
                <table className="w-full table-auto border-spacing-y-2">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-600 font-medium py-1 px-4">
                        Color
                      </td>
                      <td className="py-1 px-4">
                        {product.ProductColors || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-600 font-medium py-1 px-4">
                        Size
                      </td>
                      <td className="py-1 px-4">
                        {product.ProductSizes || "N/A"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-600 font-medium py-1 px-4">
                        Weight
                      </td>
                      <td className="py-1 px-4">{product.Weight || "N/A"}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="text-gray-600 font-medium py-1 px-4">
                        Dimensions
                      </td>
                      <td className="py-1 px-4">
                        {product.Dimensions || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="lg:px-8 py-10">
        <h2 className="text-2xl font-bold mb-6">Product Ratings & Reviews</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Rating Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-sm text-gray-600">{rating} Out of 5</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {reviewCount} Total Rating
            </p>

            {/* Rating Bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-8 text-sm text-gray-600">{stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${ratingDistribution[stars]}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm text-gray-600">
                    {ratingDistribution[stars]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              There are {reviewCount} Reviews on this product
            </h3>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                      {review.author.charAt(0)}
                    </span>
                    <span className="font-medium">{review.author}</span>
                  </div>
                  <div className="flex mb-2">{renderStars(review.rating)}</div>
                  <p className="text-gray-600">{review.comment}</p>
                  <button className="mt-2 text-sm text-gray-500 hover:text-gray-700">
                    Helpful
                  </button>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md">
                1
              </button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-md">
                2
              </button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-md">
                9
              </button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-md">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductDetailsCard.propTypes = {
  product: PropTypes.shape({
    ProductId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ProductName: PropTypes.string,
    CategoryName: PropTypes.string,
    HomePicture: PropTypes.string,
    Pictures: PropTypes.array,
    PriceAfterDiscount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    Stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    AuthorName: PropTypes.string,
    Description: PropTypes.string,
    ProductColors: PropTypes.string,
    ProductSizes: PropTypes.string,
    Weight: PropTypes.string,
    Dimensions: PropTypes.string,
  }),
};

export default ProductDetailsCard;
