import React from "react";

const OrderCard = ({ product, increment, decrement, quantity }) => {
  console.log(product);
  
  return (
    <div className="bg-white rounded-md p-4 flex flex-col md:flex-row items-start gap-4">
      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        <img src={product.HomePictureUrl || ""} alt={product.ProductName} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[#126090]">{product.ProductName}</h4>
            <p className="text-[#126090]">{product.description}</p>
          </div>
          <span className="font-medium text-[#126090]">${product.Price * quantity}</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="bg-[#126090] rounded-lg p-1 flex items-center">
            <button onClick={decrement} className="bg-white px-2 py-0.5 text-[#126090] hover:bg-gray-100 transition-colors rounded-lg text-sm">
              -
            </button>
            <span className="px-3 text-white text-sm">{quantity}</span>
            <button onClick={increment} className="bg-white px-2 py-0.5 text-[#126090] hover:bg-gray-100 transition-colors rounded-lg text-sm">
              +
            </button>
          </div>
          <button className="flex items-center border border-gray-200 rounded px-3 py-1">
            <svg className="w-5 h-5 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-[#545454]">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
