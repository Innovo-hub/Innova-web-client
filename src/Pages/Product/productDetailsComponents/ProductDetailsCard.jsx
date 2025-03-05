import React, { useState } from 'react';
import author from '../../../assets/Products/author.png';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
function ProductDetailsCard({ product }) {
    if (!product) {
        return <p>Loading...</p>; // Prevents crash if product is undefined
    }
    const [isLoved, setIsLoved] = useState(false);

    const toggleLoved = () => {
        setIsLoved((prev) => !prev);
    };
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-4 lg:px-24 px-8 py-6'>
            <div className="grid grid-cols-4 gap-2">
                {/* Main Image */}
                <div className="w-full col-span-4">
                    <img src={product.HomePicture} alt={product.Name} className="w-full h-auto rounded-lg" />
                </div>
                {/* Additional Pictures */}
                {product.Pictures?.map((pic, index) => (
                    <img key={index} src={pic} alt={`Product ${index}`} className="w-full h-auto rounded-lg" />
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <img src={author} className='h-12' />
                        <div className="flex flex-col justify-center items-center">
                            <h3 className='font-semibold'>{product.AuthorName}</h3>
                            <h3>Business Owner</h3>
                        </div>
                    </div>
                    <h3>{product.AverageRating} Review</h3>
                </div>
                <div className="flex justify-between items-center">
                    <h3 className='text-3xl text-main-color font-semibold'>{product.Name}</h3>
                    <button onClick={toggleLoved}>
                        {isLoved ? (
                            <FavoriteIcon className="text-red-500" />
                        ) : (
                            <FavoriteBorderIcon className="hover:text-red-500" />
                        )}
                    </button>
                </div>
                <div className="grid grid-cols-3 bg-gray-100  rounded-2xl mt-4 text-center">
                    <div className='flex justify-between items-center flex-col py-4 bg-[#FFFFFF] rounded-t-2xl rounded-bl-3xl'>
                        <p className="text-sm ">Price</p>
                        <p className="text-main-color font-semibold">${product.PriceAfterDiscount}</p>
                    </div>
                    <div className='rounded-2xl flex flex-col justify-between items-center'>
                        <p className="text-sm text-gray-500 my-2">Availability</p>
                        <div className="flex bg-white py-2 rounded-tr-2xl rounded-br-2xl justify-center items-center w-full">
                            <p className={product.Stock > 0 ? "bg-[#1ABA1A] text-white  text-sm px-3 py-1 rounded-full inline-block" : "bg-red-500 text-white  text-sm px-3 py-1 rounded-full inline-block"}>
                                In Stock
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center flex-col py-2'>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium">{product?.Weight || "20"} KG</p>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className='text-main-color font-semibold'>Description</h3>
                    <h3>{product.Description}</h3>
                </div>
                <div className="flex">
                    
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsCard;
