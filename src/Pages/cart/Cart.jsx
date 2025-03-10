import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import image1 from "../../assets/CartAssets/image1.png";
import { Trash } from "lucide-react";
import { Add, Remove } from "@mui/icons-material";
const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <Navbar />
      <div className="container bg-[#f7f7f7] h-screen py-10 px-5 xl:px-0">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="col-span-2">
            <div className="flex justify-between">
              <h3 className="text-2xl font-medium">
                Shopping Cart
                <span className="text-gray-400 text-sm">
                  ({quantity} {quantity > 1 ? "items" : "item"})
                </span>
              </h3>
              <Button variant="outlined">Clear Cart</Button>
            </div>

            <div className="mt-5">
              <div className="w-full flex justify-between bg-white rounded-xl p-5 space-x-5 shadow">
                <div className="">
                  <img
                    src={image1}
                    alt="Item 1 cart"
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-between w-full text-[#126090]">
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-medium">
                      Lapis Set, Necklace, ring, earrings lightweight
                    </p>

                    <div className="flex items-center px-3 py-1 bg-white">
                      <Button
                        variant="outlined"
                        size="small"
                        className="min-w-8 h-8 p-0 flex items-center justify-center"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Remove fontSize="small" />
                      </Button>

                      <span className="text-lg font-semibold mx-4">
                        {quantity}
                      </span>

                      <Button
                        variant="outlined"
                        size="small"
                        className="min-w-8 h-8 p-0 flex items-center justify-center"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Add fontSize="small" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <span className="text-lg font-semibold">$70.00</span>
                    <Button
                      variant="outlined"
                      className="text-red-600 border-red-600 flex items-center space-x-1"
                    >
                      <Trash size={16} className="text-red-600" />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto w-full ">
            <div className="bg-white rounded-xl w-full p-5">
              <h3 className="text-2xl font-medium">Order Summary </h3>
              <div className="space-y-2 mt-3 relative">
                <div className="flex justify-between">
                  <p className="text-gray-500">Subtotal</p>
                  <span className="text-[#126090]">$70.00</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Shipping</p>
                  <span className="text-[#126090]">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Tax</p>
                  <span className="text-[#126090]">$2.00</span>
                </div>
                <hr className="my-2"></hr>
                <div className="flex justify-between">
                  <p className=" text-gray-500">Total</p>
                  <span className="text-[#126090]">$72.00</span>
                </div>
                <Link to={`/checkOut`}>
                  <button className="w-full bg-[#126090] text-white py-2 rounded-xl mt-6">
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
