import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Button } from "@mui/material";

const WishList = () => {
  const { isAuthenticated } = useSelector((state) => state.login);

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-[#f7f7f7] min-h-[80vh] px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-medium">
            Wish List
            <span className="text-gray-400 text-sm ms-2">(0 items)</span>
          </h3>
          <Button variant="outlined" color="error" disabled>
            Clear All
          </Button>
        </div>

        <div className="text-center py-8">
          <h3 className="text-xl text-gray-600 mb-4">Your wishlist is empty</h3>
          <Button variant="contained" color="primary" href="/">
            Continue Shopping
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
