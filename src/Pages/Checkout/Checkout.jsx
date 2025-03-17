import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../../redux/Slices/Cart-Slice/cartReducer";
import OrderCard from './CheckoutComponents/OrderCard'

const CheckoutPage = () => {
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(10); // Example static shipping cost
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
      (acc, product) => acc + product.Price * (quantities[product.id] || 1),
      0
    );
    setSubtotal(calculatedSubtotal);
    const calculatedTax = calculatedSubtotal * 0.1; // Assuming 10% tax rate
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
            <div className="bg-white rounded-md p-6 flex-grow flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-[24px] font-semibold">Shipping Address</h3>
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" placeholder="First Name" className="border border-gray-300 rounded-md p-3 w-full" />
                  <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-md p-3 w-full" />
                </div>
                <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-md p-3 mb-6" />
                <input type="text" placeholder="Street Address" className="w-full border border-gray-300 rounded-md p-3 mb-6" />
                <input type="text" placeholder="Apartment, Suite, etc.." className="w-full border border-gray-300 rounded-md p-3 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" placeholder="Country" className="border border-gray-300 rounded-md p-3" />
                  <input type="text" placeholder="City" className="border border-gray-300 rounded-md p-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input type="text" placeholder="Postal Code" className="border border-gray-300 rounded-md p-3" />
                  <input type="text" placeholder="State/Province" className="border border-gray-300 rounded-md p-3" />
                </div>
                <div className="flex items-center mt-auto mb-6">
                  <input type="checkbox" id="billingAddress" className="w-4 h-4 text-[#126090]" />
                  <label htmlFor="billingAddress" className="ml-2 text-sm">
                    Billing address same as shipping address
                  </label>
                </div>
              </div>
              <div className="mt-auto">
                <button className="w-full bg-[#126090] text-white py-3 rounded-md cursor-pointer">
                  Continue to delivery
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            {cartProducts.map((product) => (
              <OrderCard
                key={product.id}
                product={product}
                increment={() => incrementQuantity(product.id)}
                decrement={() => decrementQuantity(product.id)}
                quantity={quantities[product.id] || 1}
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