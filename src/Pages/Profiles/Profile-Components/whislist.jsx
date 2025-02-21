import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const WishlistOrders = () => {
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Whish List products</h2>
        <div className="bg-gray-100 p-6 rounded-lg min-h-[100px]">
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-center">
              No any Whish products yet
            </p>
          ) : (
            <ul>
              {wishlist.map((wishlist, index) => (
                <li key={index} className="border-b py-2">
                  {wishlist.name} - ${wishlist.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div >
        <h2 className="text-2xl font-semibold mt-6 mb-4">Orders</h2>
        <div className="bg-gray-100 p-6 rounded-lg min-h-[100px]">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No any Orders yet</p>
          ) : (
            <ul>
              {orders.map((order, index) => (
                <li key={index} className="border-b py-2">
                  {order.name} - ${order.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistOrders;
