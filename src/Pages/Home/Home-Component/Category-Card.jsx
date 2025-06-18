import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function CategoryCard({ ImageSrc, CategoryName, categoryId }) {
  return (
    <>
      <div className="relative w-full h-64 group rounded-3xl shadow-md overflow-hidden">
        <img src={ImageSrc} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <Link
              to={`/category/${categoryId}`}
              className="block w-full bg-transparent text-white border-white border-2 py-2 px-4 rounded-lg text-center hover:bg-white hover:text-black transition-colors"
            >
              {CategoryName}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
