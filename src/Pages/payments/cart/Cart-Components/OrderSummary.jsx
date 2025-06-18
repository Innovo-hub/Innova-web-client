/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const OrderSummary = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-2xl font-semibold text-[#126090]">Order Summary</h3>
      </div>

      {/* Summary Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-[#126090]">
              EGP {subtotal.toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-[#126090]">
              {shipping === 0 ? "Free" : `EGP ${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (1%)</span>
            <span className="font-medium text-[#126090]">
              EGP {tax.toFixed(2)}
            </span>
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total</span>
              <span className="text-xl font-bold text-[#126090]">
                EGP {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link to="/checkOut" className="block mt-6">
            <button className="w-full bg-[#126090] text-white py-3 rounded-lg font-medium hover:bg-[#0d4d6e] transition-colors duration-300 flex items-center justify-center">
              <span>Proceed to Checkout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
