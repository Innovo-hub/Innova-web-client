import React from 'react';

function ProductDetailsCard({ product }) {
    if (!product) {
        return <p>Loading...</p>; // Prevents crash if product is undefined
    }

    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:px-24 px-8 py-6'>
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
        </div>
    );
}

export default ProductDetailsCard;
