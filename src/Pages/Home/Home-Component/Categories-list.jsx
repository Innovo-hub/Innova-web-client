import { Link } from "react-router-dom"

function Categorieslist() {
    const categories =[{
        name: "Women",
    },{
        name: "Men",
    },{
        name: "Kids",
    },{
        name: "Watches",
    },{
        name: "Decor",
    },{
        name: "Carpets",
    },{
        name: "Jewelry",
    },{
        name: "Drawing",
    },{
        name: "Necklace",
    },{
        name: "Crafting",
    },{
        name: "Art",
    },{
        name: "Shoes",
    }];

  return (
    <>
        <div className="flex flex-col bg-[#FFFFFF] py-2 px-4 rounded-md">
        <h4 className="text-main-color text-lg font-bold">Categories</h4>
        <div className="lg:flex lg:flex-col grid grid-cols-4 gap-2  px-8 lg:space-y-1 my-2">
            {categories.map((cat,index)=>{
                 return(  
                 <Link to={`/category/${cat.name}`} key={index} className="hover:text-main-color duration-200 transition-all">
                    {cat.name}
                 </Link>
                )
            })}
        </div>
        </div>
    </>
  )
}

export default Categorieslist