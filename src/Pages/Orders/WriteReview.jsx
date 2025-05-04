import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Star, StarBorder } from "@mui/icons-material";
import {
  addReview,
  clearReviewState,
} from "../../redux/Slices/Review-Slice/ReviewReducer";
import Swal from "sweetalert2";

function WriteReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  // Get product data from location state
  const productData = location.state?.product || null;

  const { submitLoading, submitError, submitSuccess } = useSelector(
    (state) => state.reviews
  );

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
  });

  // Clear submission status when page loads
  useEffect(() => {
    dispatch(clearReviewState());
  }, [dispatch]);

  // Navigate to orders page after successful submission
  useEffect(() => {
    if (submitSuccess) {
      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Thank you for sharing your opinion about this product",
        showConfirmButton: false,
        timer: 2000,
      });

      // Return to orders page after showing success message
      const timer = setTimeout(() => {
        navigate("/userProfile/orders");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess, navigate]);

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleCommentChange = (e) => {
    setFormData({ ...formData, comment: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a rating for the product",
      });
      return;
    }

    if (!formData.comment.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please write a comment for the product",
      });
      return;
    }
    dispatch(
      addReview({
        ProductId: parseInt(productId),
        RatingValue: formData.rating,
        Comment: formData.comment,
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#126090]">
            Write a Product Review
          </h2>
          
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {productData && (
            <div className="flex items-center mb-6 p-4 border border-gray-100 rounded-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={productData.imageUrl}
                  alt={productData.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-[#126090]">
                  {productData.productName}
                </h3>
                <p className="text-gray-500">{productData.price}</p>
              </div>
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-3xl text-yellow-400 focus:outline-none"
                  >
                    {star <= formData.rating ? (
                      <Star fontSize="inherit" />
                    ) : (
                      <StarBorder fontSize="inherit" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="comment" className="block text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                value={formData.comment}
                onChange={handleCommentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#126090]"
                placeholder="Tell us what you think about this product..."
              ></textarea>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitLoading}
              className="w-full bg-[#126090] text-white py-2 px-4 rounded-md hover:bg-[#0d4d73] transition-colors disabled:opacity-50"
            >
              {submitLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WriteReview;
