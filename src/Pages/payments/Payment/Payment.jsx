import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import CopyRights from "../../../Components/Copy-Rights";
import Checkout from "../../../assets/Checkout/checkout.png";
import DeliveryMethodSelect from "./PaymentComponents/DeliveryMethodSelect";
import axios from "axios";
import APILINK from "../../../../Constants";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  //can count  your order
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [userComment, setUserComment] = useState("");
  const navigate = useNavigate();
  const shippingPrice = selectedMethod?.Cost || 0;
  const [orderSummary, setOrderSummary] = useState({
    Subtotal: 0,
    ShippingDeliveryMethod: 0,
    Taxes: 0,
    Total: 0,
  });

  // product salary for one(defult)
  const unitPrice = 70.0;
  const taxRate = 0.01;

  //calculation to updata sumary order with your order
  const subtotal = unitPrice * quantity;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingPrice + tax;
  const handleConfirmOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${APILINK}/api/order/Confirm-Order`,
        {
          DeliveryMethodId: selectedMethod?.Id,
          UserComment: userComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkoutUrl = res.data.RedirectToCheckoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Order confirmation failed", error);
      alert("Failed to confirm order. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrderSummary = async () => {
      if (!selectedMethod) return;

      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${APILINK}/api/shipping-address/order-summary`,
          {
            DeliveryMethodId: selectedMethod.Id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch order summary:", error);
      }
    };

    fetchOrderSummary();
  }, [quantity, selectedMethod]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <hr className="border-t border-gray-200 my-2" />

      {/*payment page */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/*Address Screen */}
           <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[24px] font-semibold">Address</h2>
                <button className="border border-[#126090] text-black hover:text-[#126090] rounded-md px-4 py-2 transition-colors">
                  Edit
                </button>
              </div>
             <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Shipping Address</h3>
                <div className="text-[#545454] space-y-1">
                  <p>Nador Hari</p>
                  <p>El-Shorouk, area 1, Egypt Cairo</p>
                  <p>44519, Cairo</p>
                  <p>nadenhar7f88@gmail.com, 01203520019</p>
                </div>
              </div> 
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="billingAddress"
                  className="w-4 h-4 text-[#126090] rounded border border-[#126090]"
                />
                <label
                  htmlFor="billingAddress"
                  className="ml-2 text-sm text-gray-600"
                >
                  Billing address same as shipping address
                </label>
              </div>
            </div>
            <DeliveryMethodSelect
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </div>

          {/* Right Side^^*/}
          <div className="w-full lg:w-1/2 space-y-6">
            {/*  Comment 2 */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-[23px] font-semibold">Comment</h3>
              <textarea
                placeholder="Add Comment..."
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
            </div>
            {/* order summary 3 */}
            <div className="bg-white rounded-lg">
              <div className="p-4">
                <h3 className="text-[23px] font-semibold">Order Summary</h3>
              </div>

              <div className="space-y-2 mb-4 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-[#126090]">
                    ${orderSummary.Subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-[#126090]">
                    ${orderSummary.ShippingDeliveryMethod.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-[#126090]">
                    ${orderSummary.Taxes.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between font-semibold p-4 border-t border-gray-200">
                <span className="text-[#888888]">Total</span>
                <span className="text-[#126090]">
                  ${orderSummary.Total.toFixed(2)}
                </span>
              </div>
              <div className="text-right mt-4">
                <button
                  onClick={handleConfirmOrder}
                  className="bg-[#126090] text-white px-6 py-2 rounded-md hover:bg-[#0e4c73] transition"
                  disabled={!selectedMethod}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CopyRights />
    </div>
  );
};

export default CheckoutPage;
