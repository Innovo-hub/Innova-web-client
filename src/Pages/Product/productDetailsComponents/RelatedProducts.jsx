import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../redux/Slices/Product-Slice/ProductCategoryReducer';
import ProductCard from '../../Home/Home-Component/Product-Card';
import Loading from '../../../Components/Shared/Loading/Loading';

function RelatedProducts({ categoryId }) {
    const { productsByCategory, categoryLoading, categoryError } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [relatedError, setRelatedError] = useState("");

    useEffect(() => {
        if (categoryId) {
            dispatch(getProductByCategory({ categoryId }));
        } else {
            setRelatedError("No Category to Show");
        }
    }, [dispatch, categoryId]);

    const relatedProducts = productsByCategory?.[categoryId]?.AllProductsOnspecificCategories || [];

    return (
        <div className='flex flex-col my-2 lg:gap-12 lg:px-24 px-8 py-6'>
            <h3 className='text-2xl font-semibold'>Keep Exploring Our Shop</h3>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 ">

                {categoryLoading ? (
                    <div className="flex justify-center items-center my-4">
                        <Loading />
                    </div>
                ) : categoryError || relatedError ? (
                    <div className="col-span-full text-center text-red-500">
                        {categoryError || relatedError}
                    </div>
                ) : relatedProducts.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No products found in this category.
                    </div>
                ) : (

                    relatedProducts.map((product, index) => (
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
    );
}

export default RelatedProducts;
