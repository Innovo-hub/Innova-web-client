/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Trash } from "lucide-react";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import APILINK from "../../../../../Constants";
import { useState } from "react";

const ProductCard = ({
  imageSrc,
  productId,
  productName,
  price,
  quantity,
  onDecrease,
  onIncrease,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteFromCart = async (id) => {
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`${APILINK}/api/Cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteLoading(false);
      window.location.reload(false);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch cart data", "error");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-between bg-white rounded-xl p-5 space-x-5 shadow">
      <div>
        <img
          src={imageSrc}
          alt={productName}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>
      <div className="flex justify-between w-full text-[#126090]">
        <div className="flex flex-col justify-between">
          <p className="text-lg font-medium">{productName}</p>
          <div className="flex items-center px-3 py-1 bg-white">
            <Button
              variant="outlined"
              size="small"
              className="min-w-8 h-8 p-0"
              onClick={onDecrease}
            >
              <Remove fontSize="small" />
            </Button>
            <span className="text-lg font-semibold mx-4">{quantity}</span>
            <Button
              variant="outlined"
              size="small"
              className="min-w-8 h-8 p-0"
              onClick={onIncrease}
            >
              <Add fontSize="small" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <span className="text-lg font-semibold">${price}</span>
          <Button
            variant="outlined"
            className="text-red-600 border-red-600"
            onClick={() => {
              deleteFromCart(productId);
            }}
          >
            <Trash size={16} />
            <span>{deleteLoading ? "Removing...." : "Remove"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
