import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { publishProduct } from "../../../redux/Slices/Product-Slice/ProductCardReducer";
import { getAllCategories } from "../../../redux/Slices/Category-Slice/CategoryReducer";
import Swal from "sweetalert2";

const options = {
  sizes: ["-", "sm", "M", "L", "XL", "2XL", "3XL", "4XL"],
  colors: ["-", "Red", "Blue", "Green", "Black", "White", "Brown"],
};

const PublishProductCard = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.product.status);
  const { allcategories } = useSelector((state) => state.category);

  const [product, setProduct] = useState({
    ProductName: "",
    Description: "",
    Price: "",
    Discount: "",
    CategoryId: "",
    Stock: "",
    Dimensions: "",
    Weight: "",
    SizeNames: [],
    ColorNames: [],
    homePicture: null,
    otherPictures: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleMultiSelectChange = (name) => (event) => {
    setProduct({ ...product, [name]: event.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "otherPictures") {
      setProduct({ ...product, [name]: Array.from(files) });
    } else {
      setProduct({ ...product, [name]: files[0] });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.ProductName)
      newErrors.ProductName = "Product name is required";
    if (!product.Description) newErrors.Description = "Description is required";
    if (!product.Price) newErrors.Price = "Price is required";
    if (!product.CategoryId) newErrors.CategoryId = "Category is required";
    if (!product.Stock) newErrors.Stock = "Stock is required";
    if (!product.homePicture)
      newErrors.homePicture = "Home picture is required";
    if (product.SizeNames.length === 0)
      newErrors.SizeNames = "At least one size is required";
    if (product.ColorNames.length === 0)
      newErrors.ColorNames = "At least one color is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("ProductName", product.ProductName);
    formData.append("Description", product.Description);
    formData.append("Price", product.Price);
    formData.append("Discount", product.Discount);
    formData.append("CategoryId", product.CategoryId);
    formData.append("Stock", product.Stock);
    formData.append("Dimensions", product.Dimensions);
    formData.append("Weight", product.Weight);

    product.SizeNames.forEach((size) => formData.append("SizeNames[]", size));
    product.ColorNames.forEach((color) =>
      formData.append("ColorNames[]", color)
    );

    if (product.homePicture) {
      formData.append("HomePicture", product.homePicture);
    }

    product.otherPictures.forEach((file) => formData.append("Pictures", file));

    dispatch(publishProduct(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-7xl">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#126090]">Publish Product</h2>
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={onClose}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <TextField
              label="Product Name"
              name="ProductName"
              fullWidth
              variant="outlined"
              value={product.ProductName}
              onChange={handleChange}
              error={!!errors.ProductName}
              helperText={errors.ProductName}
            />

            <FormControl
              fullWidth
              variant="filled"
              sx={{ borderRadius: "8px" }}
            >
              <InputLabel>Product Category</InputLabel>
              <Select
                name="CategoryId"
                value={product.CategoryId}
                onChange={handleChange}
                sx={{ backgroundColor: "#F7F7F7" }}
                error={!!errors.CategoryId}
              >
                {allcategories.map((cat) => (
                  <MenuItem key={cat.CategoryId} value={cat.CategoryId}>
                    {cat.CategoryName}
                  </MenuItem>
                ))}
              </Select>
              {errors.CategoryId && (
                <p className="text-red-500 text-xs">{errors.CategoryId}</p>
              )}
            </FormControl>

            <TextField
              label="Description"
              name="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={product.Description}
              onChange={handleChange}
              error={!!errors.Description}
              helperText={errors.Description}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Price"
                name="Price"
                type="number"
                variant="outlined"
                value={product.Price}
                onChange={handleChange}
                error={!!errors.Price}
                helperText={errors.Price}
              />
              <TextField
                label="Discount (%)"
                name="Discount"
                type="number"
                variant="outlined"
                value={product.Discount}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Weight (kg,g)"
                name="Weight"
                type="text"
                variant="outlined"
                value={product.Weight}
                onChange={handleChange}
              />
              <TextField
                label="Dimensions (LxWxH)"
                name="Dimensions"
                variant="outlined"
                value={product.Dimensions}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <TextField
              label="Stock"
              name="Stock"
              fullWidth
              variant="outlined"
              value={product.Stock}
              onChange={handleChange}
              error={!!errors.Stock}
              helperText={errors.Stock}
            />

            <div className="space-y-4">
              <FormControl fullWidth variant="filled">
                <InputLabel>Colors</InputLabel>
                <Select
                  multiple
                  name="ColorNames"
                  value={product.ColorNames}
                  onChange={handleMultiSelectChange("ColorNames")}
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-1">
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                  sx={{ backgroundColor: "#F7F7F7", borderRadius: "8px" }}
                  error={!!errors.ColorNames}
                >
                  {options.colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      <Checkbox checked={product.ColorNames.includes(color)} />
                      <ListItemText primary={color} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.ColorNames && (
                  <p className="text-red-500 text-xs">{errors.ColorNames}</p>
                )}
              </FormControl>

              <FormControl fullWidth variant="filled">
                <InputLabel>Sizes</InputLabel>
                <Select
                  multiple
                  name="SizeNames"
                  value={product.SizeNames}
                  onChange={handleMultiSelectChange("SizeNames")}
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-1">
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                  sx={{ backgroundColor: "#F7F7F7", borderRadius: "8px" }}
                  error={!!errors.SizeNames}
                >
                  {options.sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      <Checkbox checked={product.SizeNames.includes(size)} />
                      <ListItemText primary={size} />
                    </MenuItem>
                  ))}
                </Select>
                {errors.SizeNames && (
                  <p className="text-red-500 text-xs">{errors.SizeNames}</p>
                )}
              </FormControl>
            </div>

            <div className="space-y-4 mt-4">
              <div className="p-4 border rounded-lg">
                <label className="font-bold block mb-2 text-[#126090]">
                  Home picture
                </label>
                <input
                  type="file"
                  name="homePicture"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
                {errors.homePicture && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.homePicture}
                  </p>
                )}
              </div>

              <div className="p-4 border rounded-lg">
                <label className="font-bold block mb-2 text-[#126090]">
                  Other pictures
                </label>
                <input
                  type="file"
                  name="otherPictures"
                  multiple
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            disabled={productStatus === "loading"}
            sx={{ py: 1.5 }}
          >
            {productStatus === "loading" ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PublishProductCard;
