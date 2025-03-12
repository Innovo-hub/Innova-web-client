import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/Slices/Category-Slice/CategoryReducer";
import Loading from "../../../Components/Shared/Loading/Loading";

function Categorieslist() {
  const { allcategories, loading, error } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const initialVisibleCount = 13; // Number of categories to show initially

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (allcategories.length > 0) {
      if (expanded) {
        setVisibleCategories(allcategories);
      } else {
        setVisibleCategories(allcategories.slice(0, initialVisibleCount));
      }
    }
  }, [allcategories, expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="flex flex-col bg-[#FFFFFF] py-2 px-4 rounded-md">
        <h4 className="text-main-color text-lg font-bold">Categories</h4>
        <div className="lg:flex lg:flex-col grid grid-cols-4 gap-2 px-8 lg:space-y-1 my-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              {visibleCategories.map((cat, index) => {
                return (
                  <Link
                    to={`/category/${cat.CategoryId}`}
                    key={index}
                    className="hover:text-main-color duration-200 transition-all"
                  >
                    {cat.CategoryName}
                  </Link>
                );
              })}

              {allcategories.length > initialVisibleCount && (
                <button
                  onClick={toggleExpand}
                  className="text-main-color hover:underline font-medium mt-2 text-left"
                >
                  {expanded
                    ? "Show Less"
                    : `Show All (${allcategories.length})`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Categorieslist;
