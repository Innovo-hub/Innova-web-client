import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import APILINK from "../../../../Constants";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import Loading from "../../../Components/Shared/Loading/Loading";
import OrderSummary from "./Cart-Components/OrderSummary";
import ProductCard from "./Cart-Components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../../../redux/Slices/Wishlist-Slice/WIshlistReducer";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearLoading, setClearLoading] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartData(response.data);
      localStorage.setItem("cartCount", response.data.NumberOfProducts || 0);
    } catch (error) {
      Swal.fire(error.message || "Error", "Failed to fetch cart data", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setClearLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${APILINK}/api/Cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      Swal.fire("Error", "Failed to Clear cart data", "error");
    } finally {
      setClearLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    dispatch(getUserWishlist()); // Fetch wishlist data
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const isCartEmpty = !cartData?.cartItems || cartData.cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#126090]">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {cartData?.NumberOfProducts || 0}{" "}
              {cartData?.NumberOfProducts === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {!isCartEmpty && (
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              disabled={clearLoading}
              className="!border-red-500 !text-red-500 hover:!bg-red-50"
            >
              {clearLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Clearing...
                </span>
              ) : (
                "Clear Cart"
              )}
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {isCartEmpty ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="mb-6">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some products and start shopping with us!
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#126090] hover:bg-[#0d4d6e] transition-colors duration-300"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartData.cartItems.map((item) => (
                  <ProductCard
                    key={item.ProductId}
                    productId={item.ProductId}
                    imageSrc={item.HomePictureUrl}
                    productName={item.ProductName}
                    price={item.Price}
                    quantity={item.Quantity}
                    isInWishlist={wishlist?.some(
                      (w) => w.ProductId === item.ProductId
                    )}
                  />
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          {!isCartEmpty && (
            <div className="lg:sticky lg:top-4">
              <OrderSummary
                subtotal={cartData.TotalPrice || 0}
                shipping={0}
                tax={cartData.TotalPrice * 0.01 || 0}
                total={
                  (cartData.TotalPrice || 0) + (cartData.TotalPrice * 0.01 || 0)
                }
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
