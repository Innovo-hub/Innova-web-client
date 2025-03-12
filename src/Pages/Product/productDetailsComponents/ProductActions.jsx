import React from "react";

export default function ProductActions({ max, quantity, setQuantity }) {
    const maxStock = max;

    const handleIncrement = () => {
        if (quantity < maxStock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleInputChange = (e) => {
        const value = Math.max(1, Math.min(maxStock, Number(e.target.value)));
        setQuantity(value);
    };

    return (
        <div className="flex flex-col items-start gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
                <div className="flex items-center bg-main-color text-white rounded px-2 py-1">
                    <button
                        className="px-2"
                        onClick={handleDecrement}
                        disabled={quantity === 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        max={maxStock}
                        value={quantity}
                        onChange={handleInputChange}
                        className="w-10 bg-transparent text-center outline-none"
                    />
                    <button
                        className="px-2"
                        onClick={handleIncrement}
                        disabled={quantity === maxStock}
                    >
                        +
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Only <span className="text-red-500">{maxStock} items</span> left! Don't miss out.
                </p>
            </div>
        </div>
    );
}
