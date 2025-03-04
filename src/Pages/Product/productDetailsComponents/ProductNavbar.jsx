import React from 'react'

function ProductNavbar({ productCategory }) {
    return (
        <div className='bg-main-color h-20 flex justify-center items-center text-3xl rounded-br-full text-white'>
            {productCategory}
        </div>
    )
}

export default ProductNavbar
