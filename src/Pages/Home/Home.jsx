import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import HomeBanner from "../../Components/Home-Banner";
import Navbar from "../../Components/Navbar";
import Loading from "../../Components/Shared/Loading/Loading";
import { getPopularCategories } from "../../redux/Slices/Category-Slice/CategoryReducer";
import { getProductByCategory } from "../../redux/Slices/Product-Slice/ProductCategoryReducer"; // Import the thunk
import BussinessBanner from "./Home-Component/Bussiness-Banner";
import Card1Home from "./Home-Component/Card1-Home";
import Card2Home from "./Home-Component/Card2-Home";
import CategoryBanner from "./Home-Component/Category-Banner";
import CategoryCard from "./Home-Component/Category-Card";
import ExploreProducts from "./Home-Component/ExploreProducts";
import InvestorBanner from "./Home-Component/InvestorBanner";
import ProductCard from "./Home-Component/Product-Card";
import VideoSlider from "./Home-Component/video-Slider";

function Home() {
  // const {
  //   token,
  //   profile,
  //   loading: loginLoading,
  //   isAuthenticated,
  // } = useSelector((state) => state.login);
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
  }, [dispatch]);

  // Fetch products for Handcrafted Carpets (categoryId = 1)
  useEffect(() => {
    dispatch(getProductByCategory({ categoryId: 12 })); // Fetch products for categoryId = 1
  }, [dispatch]);

  // Fetch products for Shop Necklaces (categoryId = 9)
  useEffect(() => {
    dispatch(getProductByCategory({ categoryId: 9 })); // Fetch products for categoryId = 9
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByCategory({ categoryId: 13 })); // Fetch products for categoryId = 13
  }, [dispatch]);

  // Determine the user's role
  const role = localStorage.getItem("role") || "Customer";

  // Get products for Handcrafted Carpets (categoryId = 1) and Shop Necklaces (categoryId = 15)
  const handcraftedCarpets =
    productsByCategory[12]?.AllProductsOnspecificCategories || [];
  const shopNecklaces =
    productsByCategory[9]?.AllProductsOnspecificCategories || [];

  const shopRings =
    productsByCategory[13]?.AllProductsOnspecificCategories || [];

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
      {/* <div className="my-8 lg:px-24 px-8">
        <h2 className="text-2xl font-semibold my-2">Best Selling products</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-4">
          {catLoading ? (
            <>
              <div className="flex justify-center items-center my-4">
                <Loading />
              </div>
            </>
          ) : (
            products.map((product) => (
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
            ))
          )}
        </div>
      </div> */}
      {/* small enhancement */}
      <Card1Home />
      {/* Handcrafted Carpets Section (categoryId = 12) */}
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
                productId={product.ProductId}
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
                productId={product.ProductId}
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
      {/* small enhancement */}
      <Card2Home />
      {/* Shop Rings Section (categoryId = 13) */}
      <div className="my-8 lg:px-24 px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold my-2">Shop Rings</h2>
          <Link className="text-main-color text-lg" to={`/category/13`}>
            Show All <NavigateNextIcon />
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 my-2">
          {productCategoryLoading ? (
            <div className="flex justify-center items-center my-2"></div>
          ) : (
            shopRings.map((product, index) => (
              <ProductCard
                productId={product.ProductId}
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
      <div>
        <div className="py-10">
          <p className="text-center text-3xl text-gray-500">
            Explore how handmade products are produced
          </p>
        </div>
      </div>
      {/* Video Slider */}
      <VideoSlider />
      {/* Explore Other Products Section */}
      <ExploreProducts />
      <Footer />
    </>
  );
}

export default Home;
