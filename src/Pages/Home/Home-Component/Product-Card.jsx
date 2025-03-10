/* eslint-disable react/prop-types */
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircleIcon from "@mui/icons-material/Circle";
import LinkIcon from "@mui/icons-material/Link";
import { useState } from "react";

function ProductCard({
  imageSrc,
  productName,
  PriceAfterDiscount,
  Price,
  Author,
  inStock,
  starsNumbers,
  NumberofRates,
}) {
  const [isLoved, setIsLoved] = useState(false);

  const toggleLoved = () => {
    setIsLoved((prev) => !prev);
  };

  return (
    <div className="card flex flex-col bg-[#FFFFFF] shadow-lg rounded-xl relative group overflow-hidden">
      {/* Image with overlay */}
      <div className="relative">
        <img className="object-cover h-64 w-full" src={imageSrc} alt={productName} />
        <div className="absolute inset-0 bg-[#126090] bg-opacity-50 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300  transition-all">
          <button className="text-white p-3 text-lg">
            Visit <LinkIcon />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col p-4 space-y-2">
        <h2 className="font-bold text-lg truncate">{productName}</h2>
        <div className="flex items-center gap-2">
          <h6
            className={
              PriceAfterDiscount == null
                ? "hidden"
                : "font-bold text-xl text-green-600"
            }
          >
            ${PriceAfterDiscount}
          </h6>
          <h6
            className={
              PriceAfterDiscount == null
                ? " text-gray-600"
                : "line-through text-gray-600"
            }
          >
            ${Price}
          </h6>
        </div>
        <h5 className="text-sm text-gray-600">
          Made by <span className="text-main-color">{Author}</span>
        </h5>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button onClick={toggleLoved}>
              {isLoved ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon className="hover:text-red-500" />
              )}
            </button>
            <ShoppingCartOutlinedIcon  />
          </div>
          <p>
            {inStock ? (
              <>
                <CheckCircleIcon className="inline-block text-green-500 mr-1 text-sm" />
                In stock
              </>
            ) : (
              <>
                <CircleIcon className="text-red-600" fontSize="small" /> Out Of
                Stock
              </>
            )}
          </p>
        </div>
        <div className={starsNumbers ? "flex items-center mt-2" : "hidden"}>
          {[...Array(5)].map((_, index) =>
            index < starsNumbers ? (
              <StarIcon key={index} className="text-yellow-500" />
            ) : (
              <StarBorderIcon key={index} className="text-gray-400" />
            )
          )}
          <span className="text-sm text-gray-600 ml-2">
            ({NumberofRates} reviews)
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
