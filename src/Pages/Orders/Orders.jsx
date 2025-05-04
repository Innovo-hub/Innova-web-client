import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/Slices/Order-Slice/OrderReducer";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { addToCart } from "../../redux/Slices/Cart-Slice/cartReducer";
import Swal from "sweetalert2";

function OrderUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOrders, loading, error } = useSelector((state) => state.order);
  const cartLoading = useSelector((state) => state.cart.loading);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = userOrders?.totalPages || 1;

  useEffect(() => {
    dispatch(getUserOrders(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const calculateTotalPrice = () => {
    if (!userOrders?.orders) return { total: "EGP 0", count: 0 };

    let count = 0;
    let totalPrice = 0;

    userOrders.orders.forEach((order) => {
      if (order.items && order.items.length > 0) {
        order.items.forEach((item) => {
          count++;
          const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
          if (!isNaN(price)) {
            totalPrice += price;
          }
        });
      }
    });

    return {
      total: `$ ${totalPrice.toFixed(2)}`,
      count,
    };
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ ProductId: productId, Quantity: 1 }))
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Product added to cart successfully.",
          showConfirmButton: false,
          timer: 1500,
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

  const handleWriteReview = (item) => {
    navigate(`/userProfile/orders/write_review/${item.ProductId}`, {
      state: { product: item },
    });
  };

  const { total, count } = calculateTotalPrice();

  return (
    <div className="min-h-screen flex flex-col  bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-[#126090] mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#126090]">Orders</h2>
          <Link to="/" className="ml-auto text-[#126090]">
            Back
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="border-b pb-2 mb-2">
                <button className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 font-medium flex items-center">
                  <span>My Orders</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <Link
                  to={"/UserProfile/return_order"}
                  className="w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 flex items-center"
                >
                  <span>Return Orders</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-center text-gray-500">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-center text-red-500">Error: {error}</p>
              </div>
            ) : !userOrders?.orders || userOrders?.orders?.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-center text-gray-500">No orders found.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Order placed</p>
                      <p className="font-medium">
                        {userOrders.orders[0]?.orderDate || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Total ({count} items)
                      </p>
                      <p className="font-medium">{total}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {userOrders.orders.map((order) => (
                    <div key={order.orderId}>
                      {order.items && order.items.length > 0
                        ? order.items.map((item) => (
                            <div
                              key={item.ProductId}
                              className="p-4 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-grow">
                                  <h3 className="text-[#126090] font-medium">
                                    {item.productName}
                                  </h3>
                                  <p className="text-[#126090] mb-3">
                                    {item.price}
                                  </p>

                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item.ProductId)
                                      }
                                      disabled={cartLoading}
                                      className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                      Buy it Again
                                    </button>
                                    <Link
                                      to={`/product/${item.ProductId}`}
                                      className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                      View your item
                                    </Link>
                                    <Link
                                      to="/UserProfile/return_order"
                                      className="flex items-center border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50"
                                    >
                                      Return Order
                                    </Link>
                                  </div>
                                </div>

                                <div>
                                  <button
                                    onClick={() => handleWriteReview(item)}
                                    className="border border-gray-300 rounded-full px-3 py-1 text-xs hover:bg-gray-50 whitespace-nowrap"
                                  >
                                    Write a product Review
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  ))}
                  {userOrders.orders.every(
                    (order) => !order.items || order.items.length === 0
                  ) && (
                    <div className="p-4 text-gray-500 text-center">
                      No items in your orders
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === index + 1
                            ? "bg-[#126090] text-white"
                            : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderUser;
