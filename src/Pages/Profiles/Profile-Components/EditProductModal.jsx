import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import APILINK from "../../../../Constants";

function EditProductModal({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    ProductId: product.ProductId,
    ProductName: product.ProductName || "",
    Description: product.ProductDescription || "",
    Price: product.ProductPriceBeforeDiscount || 0,
    Discount:
      product.ProductPriceBeforeDiscount - product.ProductPriceAfterDiscount ||
      0,
    CategoryId: product.CategoryId || "",
    Stock: product.ProductStock || 0,
    HomePicture: null,
    Pictures: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "HomePicture") {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      } else if (name === "Pictures") {
        setFormData((prev) => ({
          ...prev,
          [name]: Array.from(files),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      // Create FormData object
      const data = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "Pictures" && formData[key].length > 0) {
          formData[key].forEach((file) => {
            data.append("Pictures", file);
          });
        } else if (key === "HomePicture" && formData[key]) {
          data.append("HomePicture", formData[key]);
        } else if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      // Log the data being sent
      console.log("Sending data:", Object.fromEntries(data.entries()));

      const response = await axios({
        method: "patch",
        url: `${APILINK}/api/Product/UpdateProduct`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      console.log("Update response:", response);

      if (response.data) {
        onUpdate(response.data);
        onClose();
      }
    } catch (err) {
      console.error("Update error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
      });

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Keep current name if empty"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Keep current description if empty"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Keep current price if empty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Discount
              </label>
              <input
                type="number"
                name="Discount"
                value={formData.Discount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="Stock"
              value={formData.Stock}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Keep current stock if empty"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Home Picture (Optional)
            </label>
            <input
              type="file"
              name="HomePicture"
              onChange={handleInputChange}
              className="mt-1 block w-full"
              accept="image/*"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to keep current image
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Pictures (Optional)
            </label>
            <input
              type="file"
              name="Pictures"
              onChange={handleInputChange}
              className="mt-1 block w-full"
              accept="image/*"
              multiple
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to keep current images
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditProductModal.propTypes = {
  product: PropTypes.shape({
    ProductId: PropTypes.number.isRequired,
    ProductName: PropTypes.string,
    ProductDescription: PropTypes.string,
    ProductPriceBeforeDiscount: PropTypes.number,
    ProductPriceAfterDiscount: PropTypes.number,
    CategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ProductStock: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProductModal;
