import React from "react";

const OrderCard = ({ product, quantity }) => {
  return (
    <div className="bg-white rounded-md p-4 flex flex-col md:flex-row items-start gap-4">
      <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={product.HomePictureUrl || ""}
          alt={product.ProductName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[#126090]">{product.ProductName}</h4>
            <p className="text-[#126090]">{product.description}</p>
          </div>
          <span className="font-medium text-[#126090]">
            EGP {product.Price * quantity}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="bg-[#126090] rounded-lg px-3 py-1">
            <span className="text-white text-sm">Quantity: {quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
