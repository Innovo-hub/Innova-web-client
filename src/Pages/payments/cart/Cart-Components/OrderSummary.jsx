/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-white rounded-xl w-full p-5">
      <h3 className="text-2xl font-medium">Order Summary</h3>
      <div className="space-y-2 mt-3">
        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <span className="text-[#126090]">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Shipping</p>
          <span className="text-[#126090]">${shipping}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Tax</p>
          <span className="text-[#126090]">${tax}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <p className="text-gray-500">Total</p>
          <span className="text-[#126090]">${total}</span>
        </div>
        <Link to={`/checkOut`}>
          <button className="w-full bg-[#126090] text-white py-2 rounded-xl mt-6">
            Proceed to checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
