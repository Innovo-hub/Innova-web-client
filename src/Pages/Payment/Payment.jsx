import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import Checkout from "../../assets/Checkout/checkout.png";

const CheckoutPage = () => {
//can count  your order
const [quantity, setQuantity] = useState(1);

  // product salary for one(defult)  
  const unitPrice = 70.0;    
  const shippingPrice = 0.0;  
  const taxRate = 0.02857;   

  //calculation to updata sumary order with your order
  const subtotal = unitPrice * quantity;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingPrice + tax;

   const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // cannot be negative 
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
      <label htmlFor="billingAddress" className="ml-2 text-sm text-gray-600">
        Billing address same as shipping address
      </label>
    </div>
  </div>
</div>

          {/* Right Side^^*/}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* your order 1 */}
            <div className="bg-white rounded-md">
              <div className="p-4">
                <h3 className="text-[22px] font-semibold">Your Order</h3>
              </div>

              <div className="p-4">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={Checkout}
                      alt="Lapis Set"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[#126090]">
                          Lapis Set, Necklace, ring, earrings
                        </h4>
                        <p className="text-[#126090]">lightweight</p>
                      </div>
                      <span className="font-medium text-[#126090]">$70.00</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="bg-[#126090] rounded-lg p-1 flex items-center">
                        <button
                          onClick={decrementQuantity}
                          className="bg-white px-2 py-0.5 text-[#126090] hover:bg-gray-100 transition-colors rounded-lg text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 text-white text-sm">{quantity}</span>
                        <button
                          onClick={incrementQuantity}
                          className="bg-white px-2 py-0.5 text-[#126090] hover:bg-gray-100 transition-colors rounded-lg text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button className="flex items-center border border-gray-200 rounded px-3 py-1">
                        <svg
                          className="w-5 h-5 mr-1 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        <span className="text-[#545454]">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  Comment 2 */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-[23px] font-semibold">Comment</h3>
              <textarea
                placeholder="Add Comment..."
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none"
              ></textarea>
            </div>

            {/* order summary 3 */}
            <div className="bg-white rounded-lg">
              <div className="p-4">
                <h3 className="text-[23px] font-semibold">Order Summary</h3>
              </div>

              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-[#126090]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-[#126090]">${shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-[#126090]">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold pt-4 border-t border-gray-200">
                  <span className="text-[#888888]">Total</span>
                  <span className="text-[#126090]">${total.toFixed(2)}</span>
                </div>
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