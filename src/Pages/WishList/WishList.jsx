import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import image11 from "../../assets/CartAssets/image1.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "@mui/material";
import { Trash } from "lucide-react";
const WishList = () =>{
    const [quantity, setQuantity] = useState(1);
return (
  <>
    <Navbar />
    <div className="container bg-[#f7f7f7]">
      <div className="flex justify-between mt-6 px-4 xl:px-0">
        <h3 className="text-2xl font-medium">
          Wish List 
          <span className="text-gray-400 text-sm ms-2">
            ({quantity} {quantity > 1 ? "items" : "item"})
          </span>
        </h3>
        <Button variant="outlined">Clear</Button>
      </div>

      <div className="grid grid-col-2 sm:grid-cols-2 xl:grid-cols-4 my-5 space-x-6 space-y-6">
        <div className="bg-white px-6 py-4 w-[90%] rounded-3xl ">
          <div className="w-full">
            <img src={image11} alt="" className="w-full" />
          </div>
          <div className="my-4">
            <h2 className="my-4">
              Lapis Set, Necklace, ring, earrings lightweight
            </h2>
            <span>$70.00</span>
            <hr className="mt-4" />
            <div className="flex justify-between mt-4">
              <Button variant="outlined" sx={{ color: "black" }}>
                <ShoppingCartOutlinedIcon
                  size={20}
                  className="text-[#126090] me-2"
                />
                Add to Cart
              </Button>
              <Button variant="outlined">
                <Trash size={25} className="text-red-600" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white px-6 py-4 w-[90%] rounded-3xl ">
          <div className="w-full">
            <img src={image11} alt="" className="w-full" />
          </div>
          <div className="my-4">
            <h2 className="my-4">
              Lapis Set, Necklace, ring, earrings lightweight
            </h2>
            <span>$70.00</span>
            <hr className="mt-4" />
            <div className="flex justify-between mt-4">
              <Button variant="outlined" sx={{ color: "black" }}>
                <ShoppingCartOutlinedIcon
                  size={20}
                  className="text-[#126090] me-2"
                />
                Add to Cart
              </Button>
              <Button variant="outlined">
                <Trash size={25} className="text-red-600" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white px-6 py-4 w-[90%] rounded-3xl ">
          <div className="w-full">
            <img src={image11} alt="" className="w-full" />
          </div>
          <div className="my-4">
            <h2 className="my-4">
              Lapis Set, Necklace, ring, earrings lightweight
            </h2>
            <span>$70.00</span>
            <hr className="mt-4" />
            <div className="flex justify-between mt-4">
              <Button variant="outlined" sx={{ color: "black" }}>
                <ShoppingCartOutlinedIcon
                  size={20}
                  className="text-[#126090] me-2"
                />
                Add to Cart
              </Button>
              <Button variant="outlined">
                <Trash size={25} className="text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
}
export default WishList;