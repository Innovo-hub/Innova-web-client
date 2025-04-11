import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Button } from "@mui/material";
import ProductCard from "./Cart-Components/ProductCard";
import OrderSummary from "./Cart-Components/OrderSummary";
import axios from "axios";
import Swal from "sweetalert2";
import APILINK from "../../../Constants";
import Loading from "../../Components/Shared/Loading/Loading";
import { Link } from "react-router-dom";
import CopyRights from "../../Components/Copy-Rights";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearLoading, setClearLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartData(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch cart data", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setClearLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`${APILINK}/api/Cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClearLoading(false);
      fetchCart();
    } catch (error) {
      Swal.fire("Error", "Failed to Clear cart data", "error");
    } finally {
      setClearLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-36">
        <Loading />
      </div>
    );
  }

  // Determine if the cart is empty
  const isCartEmpty =
    (cartData.Message === "Cart is empty." && cartData.Cart?.length === 0) ||
    !cartData.cartItems ||
    cartData.cartItems.length === 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-[#f7f7f7] pt-10 px-5 xl:px-0">
        <div className="grid container grid-cols-1 xl:grid-cols-3 gap-10 flex-grow">
          <div className="col-span-2">
            <div className="flex justify-between">
              <h3 className="text-2xl font-medium">
                Shopping Cart
                <span className="text-gray-400 text-sm flex items-center">
                  ({cartData?.NumberOfProducts || 0}{" "}
                  {cartData?.NumberOfProducts > 1 ? "items" : "item"})
                </span>
              </h3>
              {!isCartEmpty && (
                <Button variant="outlined" onClick={() => clearCart()}>
                  {clearLoading ? "Clearing...." : "Clear Cart"}
                </Button>
              )}
            </div>

            <div className="mt-5 space-y-4">
              {isCartEmpty ? (
                <div className="flex flex-col justify-center items-center text-gray-500 text-lg p-16 border border-dashed border-gray-300 rounded-md">
                  No products found. Add some and enjoy shopping with us!
                  <div className="flex">
                    <Link
                      className="bg-main-color my-2 py-1 px-6 text-white rounded"
                      to={"/"}
                    >
                      Start Shopping
                    </Link>
                  </div>
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
                    onDecrease={() => console.log("Decrease quantity")}
                    onIncrease={() => console.log("Increase quantity")}
                    onRemove={() => console.log("Remove item")}
                  />
                ))
              )}
            </div>
          </div>

          {!isCartEmpty && (
            <div className="m-auto w-full">
              <OrderSummary
                subtotal={cartData.TotalPrice || 0}
                shipping={0}
                tax={2}
                total={(cartData.TotalPrice || 0) + 2}
              />
            </div>
          )}
        </div>
        <Footer />
        <CopyRights />
      </div>
    </>
  );
};

export default Cart;
