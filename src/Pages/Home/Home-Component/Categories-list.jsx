import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/Slices/Category-Slice/CategoryReducer";
import Loading from "../../../Components/Shared/Loading/Loading";

function Categorieslist() {
  const { allcategories, loading, error } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col bg-[#FFFFFF] py-2 px-4 rounded-md">
        <h4 className="text-main-color text-lg font-bold">Categories</h4>
        <div className="lg:flex lg:flex-col grid grid-cols-4 gap-2  px-8 lg:space-y-1 my-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            allcategories.map((cat, index) => {
              return (
                <Link
                  to={`/category/${cat.CategoryId}`}
                  key={index}
                  className="hover:text-main-color duration-200 transition-all"
                >
                  {cat.CategoryName}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Categorieslist;
