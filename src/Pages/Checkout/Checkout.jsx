import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../../redux/Slices/Cart-Slice/cartReducer";
import OrderCard from "./CheckoutComponents/OrderCard";
import ShippingForm from "./CheckoutComponents/ShippingForm";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(10);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    cartProducts.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartProducts]);

  useEffect(() => {
    const calculatedSubtotal = cartProducts.reduce(
      (acc, product) => acc + product.Price * (product.Quantity || 1),
      0
    );
    setSubtotal(calculatedSubtotal);
    const calculatedTax = calculatedSubtotal * 0.01;
    setTax(calculatedTax);
    setTotal(calculatedSubtotal + shippingPrice + calculatedTax);
  }, [quantities, cartProducts, shippingPrice]);

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <hr className="border-t border-gray-200 my-2" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 flex flex-col">
            <ShippingForm />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            {cartProducts.map((product) => (
              <OrderCard
                key={product.id}
                product={product}
                increment={() => incrementQuantity(product.id)}
                decrement={() => decrementQuantity(product.id)}
                quantity={product.Quantity}
              />
            ))}

            <div className="bg-white rounded-lg p-4">
              <h3 className="text-[23px] font-semibold">Order Summary</h3>
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
              <div className="mt-4">
                <Link to={'/payment'} className="w-full bg-[#126090] text-white p-3 rounded-md cursor-pointer">
                  Go to Payment
                </Link>
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
