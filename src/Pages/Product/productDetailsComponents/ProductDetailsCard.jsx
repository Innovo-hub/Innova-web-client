import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import author from '../../../assets/Products/author.png';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductActions from './ProductActions';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Swal from "sweetalert2";
import { addToCart } from '../../../redux/Slices/Cart-Slice/cartReducer';

function ProductDetailsCard({ product }) {
    if (!product) {
        return <p>Loading...</p>;
    }

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.cart);
    const [isLoved, setIsLoved] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const toggleLoved = () => {
        setIsLoved((prev) => !prev);
    };

    const handleAddToCart = () => {
        console.log("Product ID:", product.ProductId);
        console.log("Quantity:", quantity);
        dispatch(addToCart({ ProductId: product.ProductId, Quantity: quantity }))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Added to Cart",
                    text: "Product added to cart successfully.",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error || "Failed to add product to cart.",
                });
            });
    };

    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-4 lg:px-24 px-8 py-6'>
            <div className="grid grid-cols-4 gap-2">
                <div className="w-full col-span-4">
                    <img src={product.HomePicture} alt={product.Name} className="w-full h-auto rounded-lg" />
                </div>
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
                    <h3 className='text-3xl text-main-color font-semibold'>{product.ProductName}</h3>
                    <button onClick={toggleLoved}>
                        {isLoved ? (
                            <FavoriteIcon className="text-red-500" />
                        ) : (
                            <FavoriteBorderIcon className="hover:text-red-500" />
                        )}
                    </button>
                </div>

                <ProductActions max={product.Stock} quantity={quantity} setQuantity={setQuantity} />

                <div className="flex gap-12 bg-main-color px-12 py-4 rounded-tl-3xl rounded-br-3xl w-full">
                    <button
                        className="flex justify-center items-center gap-1 bg-white text-main-color px-4 py-2 w-1/2 rounded-lg"
                        onClick={handleAddToCart}
                        disabled={loading}
                    >
                        <ShoppingCartOutlinedIcon />
                        {loading ? 'Adding...' : 'Add to Cart'}
                    </button>
                    <button className="bg-white text-main-color px-4 py-2 w-1/2 rounded-lg">
                        Buy Now!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsCard;
