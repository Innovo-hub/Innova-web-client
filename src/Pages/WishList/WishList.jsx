import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../Components/Shared/Loading/Loading";
import { useEffect, useState } from "react";
import {
  getUserWishlist,
  removeFromWishlist,
} from "../../redux/Slices/Wishlist-Slice/WIshlistReducer";
import ProductCard from "../Home/Home-Component/Product-Card";

const WishList = () => {
  const { isAuthenticated } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);
  const [deletingItems, setDeletingItems] = useState({});

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  const handleRemoveItem = async (productId) => {
    try {
      setDeletingItems((prev) => ({ ...prev, [productId]: true }));
      await dispatch(removeFromWishlist({ ProductId: productId })).unwrap();
      await dispatch(getUserWishlist());
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setDeletingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-medium mb-4">
            Please login to view your wishlist
          </h2>
          <Button variant="contained" color="primary" href="/login">
            Login
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const wishlistItems = wishlist || [];

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-[#f7f7f7] min-h-[80vh] px-4 py-8">
        <h3 className="text-2xl font-medium mb-8">
          My Wishlist
          <span className="text-gray-400 text-sm ms-2">
            ({wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"})
          </span>
        </h3>

        {loading ? (
          <div className="flex justify-center my-10">
            <Loading />
          </div>
        ) : wishlistItems.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <ProductCard
                  productId={item.ProductId}
                  imageSrc={
                    item.ProductHomeImage ||
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  productName={item.ProductName}
                  PriceAfterDiscount={item.FinalPrice}
                  Price={item.ProductPrice}
                  Author={item.Author || "Unknown"}
                  inStock={item.ProductStock}
                  starsNumbers={item.StarsNumbers || 0}
                  NumberofRates={item.NumberofRates || 0}
                  loved={true}
                />
                <button
                  onClick={() => handleRemoveItem(item.ProductId)}
                  disabled={deletingItems[item.ProductId]}
                  className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <DeleteIcon fontSize="small" />
                  <span className="font-medium">Remove from Wishlist</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-xl text-gray-600 mb-4">
              Your wishlist is empty
            </h3>
            <Button variant="contained" color="primary" href="/">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
