import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
function CategoryCard({ImageSrc,CategoryName,categoryId}) {
  return (
    <>
    <div className="relative w-full group rounded-3xl shadow-md">
        <img src={ImageSrc} className="w-full"/>
        <div className="px-3 absolute inset-0 top-24  rounded-3xl flex items-center justify-center  transition-opacity">
            <Link to={`/category/${categoryId}`} className="bg-transparent text-white border-white border-2 py-2 rounded-lg text-center w-full">{CategoryName}</Link>
        </div>
    </div>
       
    </>
  )
}

export default CategoryCard