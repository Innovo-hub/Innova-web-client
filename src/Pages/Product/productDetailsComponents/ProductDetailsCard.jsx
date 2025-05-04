import { useState, useEffect } from "react";
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
import { getAllProductComments } from "../../../redux/Slices/Review-Slice/ReviewReducer";

function ProductDetailsCard({ product }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);
  const {
    comments,
    numOfComments,
    averageRating,
    ratingBreakdown,
    commentsLoading,
  } = useSelector((state) => state.reviews);

  // State
  const [isLoved, setIsLoved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [homeImage, setHomeImage] = useState(product?.HomePicture || "");

  useEffect(() => {
    if (product?.ProductId) {
      dispatch(getAllProductComments(product.ProductId));
    }
  }, [dispatch, product?.ProductId]);

  if (!product) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  // Convert rating breakdown from API to percentage format
  const calculateRatingPercentage = () => {
    if (!ratingBreakdown || Object.keys(ratingBreakdown).length === 0) {
      return {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };
    }

    const total = numOfComments || 1; // Avoid division by zero
    return {
      5: Math.round(((ratingBreakdown["5 star"] || 0) / total) * 100),
      4: Math.round(((ratingBreakdown["4 star"] || 0) / total) * 100),
      3: Math.round(((ratingBreakdown["3 star"] || 0) / total) * 100),
      2: Math.round(((ratingBreakdown["2 star"] || 0) / total) * 100),
      1: Math.round(((ratingBreakdown["1 star"] || 0) / total) * 100),
    };
  };

  const ratingDistribution = calculateRatingPercentage();

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

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
                <span className="font-bold text-lg">
                  {averageRating?.toFixed(1) || "0.0"}
                </span>
                <div className="flex">{renderStars(averageRating || 0)}</div>
                <span className="text-gray-700 text-sm">
                  {numOfComments || 0} Rating
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
      <div className="lg:px-8 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Product Ratings & Reviews
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Rating Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Customer Reviews
            </h3>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex text-yellow-400">
                {renderStars(averageRating || 0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {averageRating || 0} out of 5
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Based on {numOfComments || 0} reviews
            </p>

            {/* Rating Bars */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-6 text-sm font-medium text-gray-700">
                    {stars}
                  </span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                      style={{ width: `${ratingDistribution[stars]}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-sm font-medium text-gray-700">
                    {ratingDistribution[stars]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {numOfComments || 0} Customer Reviews
            </h3>
            {commentsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : comments?.length > 0 ? (
              <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {comments.map((comment) => (
                  <div
                    key={comment.CommentId}
                    className="border-b border-gray-100 pb-5 last:border-b-0 hover:bg-gray-50 p-3 rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {comment.UserName.charAt(0)}
                      </span>
                      <div>
                        <span className="font-medium text-gray-800 block">
                          {comment.UserName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.CreatedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex mb-3 text-yellow-400">
                      {renderStars(4)}
                    </div>
                    <p className="text-gray-700">{comment.CommentText}</p>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        Helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <p className="text-gray-600">No reviews yet for this product</p>
              </div>
            )}

            {/* Pagination - show only if there are comments */}
            {comments?.length > 0 && (
              <div className="flex justify-center gap-1 mt-6">
                <button className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                  2
                </button>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                  3
                </button>
                <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
                  ›
                </button>
              </div>
            )}
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
