import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ProductNavbar from './productDetailsComponents/ProductNavbar';
import { getOneProduct } from '../../redux/Slices/Product-Slice/ProductCategoryReducer';
import Loading from '../../Components/Shared/Loading/Loading';
import ProductDetailsCard from './productDetailsComponents/productDetailsCard';
import ProductComments from './productDetailsComponents/ProductComments';
import RelatedProducts from './productDetailsComponents/RelatedProducts';
import Footer from '../../Components/Footer';
import CopyRights from '../../Components/Copy-Rights';

function ProductDetails() {
    const { id } = useParams();
    const { product, productLoading } = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getOneProduct({ id }));
        }
    }, [dispatch, id]);

    return (
        <div>
            <Navbar />
            <ProductNavbar productCategory={product?.CategoryName} />
            {productLoading ? (
                <div className='flex justify-center items-center'>
                    <Loading />
                </div>
            ) : (
                <ProductDetailsCard product={product} />
            )}
            <ProductComments />
            {!productLoading && product?.CategoryId && (
                <RelatedProducts categoryId={product.CategoryId} />
            )}
            <Footer />
        </div>
    );
}

export default ProductDetails;
