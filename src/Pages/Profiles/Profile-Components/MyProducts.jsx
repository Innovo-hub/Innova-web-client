import { useEffect, useState } from "react";
import axios from "axios";
import APILINK from "../../../../Constants";
import Loading from "../../../Components/Shared/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import EditProductModal from "./EditProductModal";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${APILINK}/api/Profile/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(response.data.Id);
        return response.data.Id;
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.response?.data?.message || "Failed to fetch user profile");
        return null;
      }
    };

    const fetchProducts = async (authorId) => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${APILINK}/api/Product/getAllProducts?page=1&pageSize=10000`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Check if response.data and Products array exists
        if (!response.data || !response.data.Products) {
          throw new Error("Invalid response format");
        }

        // Filter products where ProductAuthorId matches the user's ID
        const myProducts = response.data.Products.filter(
          (product) => product.ProductAuthorId === authorId
        );

        setProducts(myProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch products"
        );
        setLoading(false);
      }
    };

    const initializeData = async () => {
      const authorId = await fetchUserProfile();
      if (authorId) {
        await fetchProducts(authorId);
      } else {
        setLoading(false);
        setError("Could not fetch user profile");
      }
    };

    initializeData();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.ProductId === updatedProduct.ProductId
          ? updatedProduct
          : product
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 my-8">Error: {error}</div>;
  }

  if (!products.length) {
    return (
      <div className="text-center text-gray-500 my-8">
        You haven't published any products yet.
      </div>
    );
  }

  return (
    <div className="mt-6 px-6 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Products</h2>
        <span className="text-gray-600">Total Products: {products.length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.ProductId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
          >
            <button
              onClick={() => handleEditClick(product)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            >
              <EditIcon className="text-gray-600" />
            </button>
            <img
              src={product.ProductHomePicture || "default-product-image.jpg"}
              alt={product.ProductName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.ProductName}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {product.ProductDescription}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  {product.ProductPriceBeforeDiscount !==
                  product.ProductPriceAfterDiscount ? (
                    <>
                      <span className="text-gray-400 line-through text-sm mr-2">
                        ${product.ProductPriceBeforeDiscount}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        ${product.ProductPriceAfterDiscount}
                      </span>
                    </>
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      ${product.ProductPriceBeforeDiscount}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm text-gray-600">
                    {product.ProductRate} ({product.NumberOfRatings})
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Stock: {product.ProductStock}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    product.ProductStock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.ProductStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default MyProducts;
