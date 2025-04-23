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
import la1 from "../../assets/HomeAssets/la1.jpg";
import la2 from "../../assets/HomeAssets/la2.jpg";
import InvestorBanner from "./Home-Component/InvestorBanner";
import VideoSlider from "./Home-Component/video-Slider";

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
      <div className="my-8 lg:px-24 px-8">
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
      </div>
      {/* small enhancement */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-gray-200 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Crafted with <span className="text-blue-700">Heart</span>
                </h2>
                <div className="w-20 h-1 bg-blue-700"></div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Every piece we create tells a unique story of passion and
                dedication. Our artisans pour their soul into crafting timeless
                pieces that blend traditional techniques with modern elegance.
                Each creation is a testament to our commitment to excellence and
                attention to detail.
              </p>
              <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold text-blue-700 italic">
                  &ldquo;Where tradition meets innovation, and quality becomes
                  art&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-700/70"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-700/40"></div>
                  </div>
                  <span className="text-gray-500 font-medium">
                    Handcrafted Excellence
                  </span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={la2}
                  alt="Handcrafted Artistry"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm font-light">
                    Discover the Art of Craftsmanship
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-700/10 rounded-full transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>

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
      <div className="bg-gradient-to-l from-white via-gray-50 to-slate-300 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={la1}
                  alt="Handcrafted Artistry"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm font-light">
                    Discover the Art of Handcrafting
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-red-700/10 rounded-full transform rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Where Art Meets <span className="text-red-700">Soul</span>
                </h2>
                <div className="w-20 h-1 bg-red-700"></div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                In every stitch, every curve, and every detail lies a story of
                passion and dedication. Our artisans pour their heart into
                creating pieces that transcend time, blending traditional
                craftsmanship with contemporary elegance.
              </p>
              <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold text-red-700 italic">
                  "Because perfection isn't just a goal, it's our legacy"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-700"></div>
                    <div className="w-3 h-3 rounded-full bg-red-700/70"></div>
                    <div className="w-3 h-3 rounded-full bg-red-700/40"></div>
                  </div>
                  <span className="text-gray-500 font-medium">
                    Handcrafted with Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <VideoSlider />
      </div>
      {/* Explore Other Products Section */}
      <div className="my-16 lg:px-24 px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Explore Other Products
          </h2>
          <p className="text-gray-600">
            Discover our unique collection of handcrafted products
          </p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 mt-8 gap-8">
          <div className="col-span-1 h-[500px] group">
            <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={explore1}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Explore 1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-xl font-semibold">
                  Handcrafted Collection
                </h3>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 col-span-1 space-y-6">
            <div className="h-[242px] group">
              <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={explore2}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Explore 2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white text-lg font-semibold">
                    Artistic Designs
                  </h3>
                </div>
              </div>
            </div>
            <div className="h-[242px] group">
              <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={explore3}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt="Explore 3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white text-lg font-semibold">
                    Unique Pieces
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 h-[500px] group">
            <div className="relative h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={explore4}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Explore 4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center transition-all duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-bold mb-4">
                    Special Collection
                  </h3>
                  <Link className="inline-flex items-center px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                    Explore Now <NavigateNextIcon className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
