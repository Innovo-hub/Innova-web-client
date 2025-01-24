import Navbar from "../../Components/Navbar";
import HomeBanner from "../../Components/Home-Banner";
import products from "./Home-data/Products";
import Secondproducts from "./Home-data/Carpts-products";
import thirdproducts from "./Home-data/Necklace-Products";
import Categorycard from "./Home-data/Category-data";
import CategoryCard from "./Home-Component/Category-Card";
import ProductCard from "./Home-Component/Product-Card";
import CategoryBanner from "./Home-Component/Category-Banner";
import explore1 from "../../assets/Products/prod4.png";
import explore2 from "../../assets/Products/image-12.png";
import explore3 from "../../assets/Products/image-13.png";
import explore4 from "../../assets/Products/explore4.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import CopyRights from "../../Components/Copy-Rights";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/Slices/User-Slice/UserProfile";
import { useEffect } from "react";
import BussinessBanner from "./Home-Component/Bussiness-Banner";
{
  /*refactoter */
}
function Home() {
  const { token } = useSelector((state) => state.login);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
<<<<<<< HEAD
  let role = "BusinessOwner";
  // if (token) {
  //   role = profile?.userRoleName;
  //   console.log("Role ", role);
=======
  console.log(profile);

  let role = "BusinessOwner";
   // if (token) {
  //   role = profile?.userRoleName;
>>>>>>> 1798ec3b85d2d57f98f9edc05b5a6a6fe002a62d
  // } else {
  //   role = "Customer";
  // }
  useEffect(() => {
    dispatch(getUserProfile({ token }));
  }, [dispatch, token]);
  return (
    <>
      <Navbar currentTab={"Home"} />
      <HomeBanner />

      {/*top part of me^^^(Business owner page) */}
      {role == "BusinessOwner" ? <BussinessBanner /> : <CategoryBanner />}
      {/*end section 4cards at top*/}

      {/* Category Section  */}
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-8 lg:px-24 px-8">
        {Categorycard.map((cat, index) => {
          return (
            <CategoryCard
              ImageSrc={cat.ImageSrc}
              key={index}
              CategoryName={cat.CategoryName}
            />
          );
        })}
      </div>
      {/* Best Selling Products Section  */}
      <div className="my-8 lg:px-24 px-8">
        <h2 className="text-2xl font-semibold my-2">Best Selling products</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24 my-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
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
      {/* Hand Crafts Carpts Section  */}
      <div className="my-8 lg:px-24 px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold my-2">Handcrafted Carpets</h2>
          <Link className="text-main-color text-lg">
            Show All <NavigateNextIcon />
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24 my-2">
          {Secondproducts.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              productName={product.productName}
              PriceAfterDiscount={product.PriceAfterDiscount}
              Price={product.Price}
              Author={product.Author}
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
      {/* Shop Neckalces  */}
      <div className="my-8 lg:px-24 px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold my-2">Shop Necklaces</h2>
          <Link className="text-main-color text-lg">
            Show All <NavigateNextIcon />
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24 my-2">
          {thirdproducts.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              productName={product.productName}
              PriceAfterDiscount={product.PriceAfterDiscount}
              Price={product.Price}
              Author={product.Author}
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
      <div className="my-2 lg:px-24 px-8">
        <h2 className="text-2xl font-semibold my-2">Explore Other Products</h2>
        <div className="grid lg:grid-cols-3 grid-cols-1  mt-8 gap-8">
          <div className="col-span-1 h-[80%]">
            <img
              src={explore1}
              className="lg:flex w-full hidden rounded-lg h-full"
            />
          </div>
          <div className="lg:col-span-1 col-span-1 space-y-6">
            <img
              src={explore2}
              className="lg:flex w-full hiddenl rounded-lg h-56"
            />
            <div className=" w-full  ">
              <img
                src={explore3}
                className="lg:flex w-full hidden rounded-lg h-56"
              />

              {/* Absolute div with blur effect */}
            </div>
          </div>
          <div className="relative col-span-1 group h-[80%]">
            <img src={explore4} className="flex w-full  h-full" />
            <div className="px-3 absolute inset-0 w-full grayscale shadow-md bg-white/30   rounded-lg flex  flex-col items-center justify-center transition-opacity">
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
