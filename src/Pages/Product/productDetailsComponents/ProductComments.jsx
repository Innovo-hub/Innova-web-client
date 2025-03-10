import React, { useState } from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
function ProductComments() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleAddComment = () => {
        if (comment.trim() !== "") {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    return (
        <>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-4 lg:px-24 px-8 py-6">
                {/* Add Comment Section */}
                <div className="flex flex-col justify-start items-start gap-4">
                    <h3 className="lg:text-3xl text-lg font-semibold">Add a comment!</h3>

                    {/* Add Comment Input */}
                    <div className="flex items-center bg-gray-100 p-6 rounded-lg w-full gap-2">
                        <input
                            type="text"
                            placeholder="What do you think about?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-grow bg-white outline-none px-2 py-3 rounded-xl"
                        />
                        <button
                            onClick={handleAddComment}
                            className="bg-main-color flex justify-center items-center text-white px-4 py-2 rounded-full"
                        >
                            Add <SendOutlinedIcon fontSize="small" />
                        </button>
                    </div>

                    {/* Chat with Owner */}
                    <div className="flex items-center   bg-gray-100 p-6 rounded-lg w-full cursor-pointer">
                        <div className="flex items-center bg-white rounded-lg w-full py-2 px-8">
                            <span className="flex-grow">Chat With Owner Now!</span>
                            <span className="text-main-color"><ChatOutlinedIcon /></span>
                        </div>
                    </div>
                </div>

                {/* Comments Display Section */}
                <div className="flex flex-col justify-start items-start gap-4">
                    <h3 className="lg:text-3xl text-lg font-semibold">All Product Comments</h3>
                    <div className="bg-gray-100 w-full h-48 flex justify-center items-center rounded-lg">
                        {comments.length > 0 ? (
                            <ul className="w-full px-4">
                                {comments.map((c, idx) => (
                                    <li key={idx} className="py-1 border-b last:border-b-0">
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No Any Comments yet !!</p>
                        )}
                    </div>
                </div>

                {/* Shipping and Return Info */}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 lg:px-24 px-8 py-6">
                <div className="flex  items-center  bg-white gap-2 border p-3 rounded-xl ">
                    <span className="text-main-color"><LocalShippingOutlinedIcon fontSize="large" /></span>
                    <div>
                        <p className="font-semibold">Shipping</p>
                        <p className="text-sm text-gray-500">Estimated Delivery Date: Mar 9, 2025</p>
                    </div>
                </div>
                <div className="flex items-start bg-white gap-2 border p-3 rounded-xl">
                    <span className="text-main-color"><VerifiedUserOutlinedIcon fontSize="large" /></span>
                    <div>
                        <p className="font-semibold">Return and Exchange up to 10 days</p>
                        <p className="text-sm text-gray-500">
                            We'll do our best to make sure your return is hassle-free.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductComments;
