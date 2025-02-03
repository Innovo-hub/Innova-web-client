import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HomeBanner from "../../Components/Home-Banner";
import CategorySearch from "./Category-Compnent/Category-Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductByCategory } from "../../redux/Slices/Product-Slice/ProductCategoryReducer";
import Loading from "../../Components/Shared/Loading/Loading";
import ProductCard from "../Home/Home-Component/Product-Card";

function Category() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productsByCategory, loading: productcategoryLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductByCategory({ categoryId: id }));
    }
  }, [dispatch, id]);

  const categoryData = productsByCategory[id]; // Get category-specific data
  console.log(categoryData); // Log after render

  return (
    <>
      <Navbar />
      <HomeBanner />
      {productcategoryLoading ? (
        <div className="flex justify-center items-center my-2">
          <Loading />
        </div>
      ) : categoryData ? (
        <div className="lg:flex flex-col justify-center items-center py-10 space-y-3 ">
          <h2 className="text-main-color text-3xl">
            {categoryData.CategoryName}
          </h2>
          <h2 className="lg:text-2xl text-lg font-semibold">
            {categoryData.CategoryDescription}
          </h2>
          <CategorySearch />
          {/* Render products */}
          <h2 className="text-main-color font-semibold lg:text-2xl text-lg text-center">
            Find out more and give us more power to complete our journey.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {categoryData.AllProductsOnspecificCategories.map(
              (product, index) => (
                <ProductCard
                  key={index}
                  imageSrc={product.HomePicture}
                  productName={product.ProductName}
                  Price={product.ProductPrice}
                  inStock={product.IsAvailable}
                  Author={product.AuthorName}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">No category found.</p>
      )}
    </>
  );
}

export default Category;
