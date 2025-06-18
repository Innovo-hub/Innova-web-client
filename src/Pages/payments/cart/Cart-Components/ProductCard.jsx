/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Trash } from "lucide-react";
import axios from "axios";
import APILINK from "../../../../../Constants";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../../redux/Slices/Wishlist-Slice/WIshlistReducer";

const ProductCard = ({
  imageSrc,
  productId,
  productName,
  price,
  quantity,
  isInWishlist = false,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isLoved, setIsLoved] = useState(isInWishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoved(isInWishlist);
  }, [isInWishlist]);

  const deleteFromCart = async (id) => {
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${APILINK}/api/Cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload(false);
    } catch (error) {
      Swal.fire("Error", "Failed to remove item from cart", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddToWishlist = () => {
    setIsLoved((prev) => !prev);
    dispatch(addToWishlist(productId))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: isLoved ? "Removed from Wishlist" : "Added to Wishlist",
          text: isLoved
            ? "Product removed from wishlist."
            : "Product added to wishlist.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setIsLoved((prev) => !prev); // Revert the heart state on error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error || "Failed to update wishlist.",
        });
      });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-6">
        {/* Image Container */}
        <div className="w-32 h-32 flex-shrink-0 relative group">
          <img
            src={imageSrc}
            alt={productName}
            className="w-full h-full object-cover rounded-lg shadow-sm"
          />
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
          >
            {isLoved ? (
              <FavoriteIcon className="text-red-500 text-xl" />
            ) : (
              <FavoriteBorderIcon className="text-gray-600 hover:text-red-500 text-xl" />
            )}
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-[#126090] mb-2">
                {productName}
              </h3>
              <div className="inline-block bg-[#126090]/10 rounded-full px-4 py-1 text-[#126090]">
                Quantity: {quantity}
              </div>
            </div>
            <div className="text-xl font-bold text-[#126090]">EGP {price}</div>
          </div>

          {/* Total and Remove Button */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="text-gray-600">
              Total:{" "}
              <span className="font-semibold text-[#126090]">
                EGP {(price * quantity).toFixed(2)}
              </span>
            </div>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteFromCart(productId)}
              disabled={deleteLoading}
              className="!border-red-500 !text-red-500 hover:!bg-red-50"
              size="small"
            >
              <Trash size={16} className="mr-2" />
              {deleteLoading ? "Removing..." : "Remove"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
