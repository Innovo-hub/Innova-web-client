import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularCategories } from "../../redux/Slices/Category-Slice/CategoryReducer";
import { getProductByCategory } from "../../redux/Slices/Product-Slice/ProductCategoryReducer"; // Import the thunk
import Navbar from "../../Components/Navbar";
import HomeBanner from "../../Components/Home-Banner";
import BussinessBanner from "./Home-Component/Bussiness-Banner";
import CategoryBanner from "./Home-Component/Category-Banner";
import CategoryCard from "./Home-Component/Category-Card";
import ProductCard from "./Home-Component/Product-Card";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import Loading from "../../Components/Shared/Loading/Loading";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import products from "./Home-data/Products"; // Keep the static data for Best Selling Products
import explore1 from "../../assets/Products/prod4.png";
import explore2 from "../../assets/Products/image-12.png";
import explore3 from "../../assets/Products/image-13.png";
import explore4 from "../../assets/Products/explore4.png";

import InvestorBanner from "./Home-Component/InvestorBanner";

function Home() {
  const {
    token,
    profile,
    loading: loginLoading,
    isAuthenticated,
  } = useSelector((state) => state.login);
  const {
    popularcategory,
    error: catError,
    loading: catLoading,
  } = useSelector((state) => state.category);
  const { productsByCategory, loading: productCategoryLoading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  // Fetch categories on component mount or token change
  useEffect(() => {
    dispatch(getPopularCategories());
  }, [dispatch, token]);

  // Fetch products for Handcrafted Carpets (categoryId = 1)
  useEffect(() => {
    if (token) {
      dispatch(getProductByCategory({ categoryId: 13 })); // Fetch products for categoryId = 1
    }
  }, [dispatch, token]);

  // Fetch products for Shop Necklaces (categoryId = 15)
  useEffect(() => {
    if (token) {
      dispatch(getProductByCategory({ categoryId: 9 })); // Fetch products for categoryId = 15
    }
  }, [dispatch, token]);

  // Determine the user's role
  const role = localStorage.getItem("role") || "Customer";

  // Get products for Handcrafted Carpets (categoryId = 1) and Shop Necklaces (categoryId = 15)
  const handcraftedCarpets =
    productsByCategory[13]?.AllProductsOnspecificCategories || [];
  const shopNecklaces =
    productsByCategory[9]?.AllProductsOnspecificCategories || [];

  return (
    <>
      <Navbar currentTab={"Home"} />
      <HomeBanner />

      {/* Conditionally render the banner based on the role */}
      {role === "BusinessOwner" ? (
        <BussinessBanner />
      ) : role === "Investor" ? (
        <InvestorBanner />
      ) : (
        <CategoryBanner />
      )}
      {/* Category Section */}
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-8 lg:px-24 px-8">
        {popularcategory.map((cat, index) => (
          <CategoryCard
            ImageSrc={cat.ImageUrl}
            categoryId={cat.Id}
            key={index}
            CategoryName={cat.Name}
          />
        ))}
      </div>

      {/* Best Selling Products Section (Keep as it is) */}
      <div className="my-8 lg:px-24 px-8">
        <h2 className="text-2xl font-semibold my-2">Best Selling products</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              imageSrc={product.imageSrc}
              productName={product.productName}
              PriceAfterDiscount={product.PriceAfterDiscount}
              Price={product.Price}
              Author={product.Author}
              inStock={product.inStock}
              starsNumbers={product.starsNumbers}
              NumberofRates={product.NumberofRates}
            />
          ))}
        </div>
      </div>

      {/* Handcrafted Carpets Section (categoryId = 13) */}
      <div className="my-8 lg:px-24 px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold my-2">Handcrafted Carpets</h2>
          <Link className="text-main-color text-lg" to={`/category/13`}>
            Show All <NavigateNextIcon />
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-2">
          {productCategoryLoading ? (
            <div className="flex justify-center items-center my-4">
              <Loading />
            </div>
          ) : (
            handcraftedCarpets.map((product, index) => (
              <ProductCard
                key={index}
                productId={product.id}
                imageSrc={product.HomePicture}
                productName={product.ProductName}
                Price={product.ProductPrice}
                Author={product.AuthorName}
                inStock={product.IsAvailable}
              />
            ))
          )}
        </div>
      </div>

      {/* Shop Necklaces Section (categoryId = 9) */}
      <div className="my-8 lg:px-24 px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold my-2">Shop Necklaces</h2>
          <Link className="text-main-color text-lg" to={`/category/9`}>
            Show All <NavigateNextIcon />
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-2">
          {productCategoryLoading ? (
            <div className="flex justify-center items-center my-2"></div>
          ) : (
            shopNecklaces.map((product, index) => (
              <ProductCard
                productId={product.id}
                key={index}
                imageSrc={product.HomePicture}
                productName={product.ProductName}
                Price={product.ProductPrice}
                Author={product.AuthorName}
                inStock={product.IsAvailable}
              />
            ))
          )}
        </div>
      </div>

      {/* Explore Other Products Section */}
      <div className="my-2 lg:px-24 px-8">
        <h2 className="text-2xl font-semibold my-2">Explore Other Products</h2>
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-8 gap-8">
          <div className="col-span-1 h-[80%]">
            <img
              src={explore1}
              className="lg:flex w-full hidden rounded-lg h-[95%]"
              alt="Explore 1"
            />
          </div>
          <div className="lg:col-span-1 col-span-1 space-y-6">
            <img
              src={explore2}
              className="lg:flex w-full hidden rounded-lg h-56"
              alt="Explore 2"
            />
            <div className="w-full">
              <img
                src={explore3}
                className="lg:flex w-full hidden rounded-lg h-56"
                alt="Explore 3"
              />
            </div>
          </div>
          <div className="relative col-span-1 group h-[74%]">
            <img
              src={explore4}
              className="flex w-full h-full"
              alt="Explore 4"
            />
            <div className="px-3 absolute inset-0 w-full grayscale shadow-md bg-white/30 rounded-lg flex flex-col items-center justify-center transition-opacity">
              <Link className="font-semibold text-center text-xl text-gray-700">
                Explore Now <NavigateNextIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CopyRights />
    </>
  );
}

export default Home;
