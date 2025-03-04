import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ProductNavbar from './productDetailsComponents/ProductNavbar';
import { getOneProduct } from '../../redux/Slices/Product-Slice/ProductCategoryReducer';
import Loading from '../../Components/Shared/Loading/Loading';
import ProductDetailsCard from './productDetailsComponents/productDetailsCard';

function ProductDetails() {
    const { id } = useParams();
    console.log(id);

    const { product, loading, error } = useSelector(state => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneProduct({ id }));
    }, []);
    return (
        <div>
            <Navbar />
            <ProductNavbar productCategory="Necklace" />
            {loading ? <div className='flex justify-center items-center'>
                <Loading />
            </div> : <ProductDetailsCard product={product} />}
        </div>
    )
}

export default ProductDetails
