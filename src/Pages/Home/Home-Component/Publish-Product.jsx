import { useEffect, useState } from "react";
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

const options = {
  sizes: ["-", "sm", "M", "L", "XL", "2XL", "3XL", "4XL"],
  colors: [
    "-",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Gray",
    "Cyan",
    "Magenta",
    "Teal",
    "Indigo",
    "Lime",
    "Maroon",
    "Navy",
    "Olive",
    "Turquoise",
  ],
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl h-[95vh] flex flex-col">
        <form className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-[#126090]">
                Publish Product
              </h2>
              <p className="text-gray-600 text-sm">
                Fill in the product details to publish it to the store
              </p>
            </div>
            <button
              type="button"
              className="text-gray-500 hover:text-red-500 transition-colors"
              onClick={onClose}
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Content Area with Auto Scroll if needed */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-[#126090] font-semibold">
                    Basic Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter the main details of your product
                  </p>
                </div>

                <TextField
                  label="Product Name"
                  name="ProductName"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={product.ProductName}
                  onChange={handleChange}
                  error={!!errors.ProductName}
                  helperText={
                    errors.ProductName || "Enter a clear and descriptive name"
                  }
                />

                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Product Category</InputLabel>
                  <Select
                    name="CategoryId"
                    value={product.CategoryId}
                    onChange={handleChange}
                    label="Product Category"
                    error={!!errors.CategoryId}
                  >
                    {allcategories.map((cat) => (
                      <MenuItem key={cat.CategoryId} value={cat.CategoryId}>
                        {cat.CategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.CategoryId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.CategoryId}
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-1">
                    Select the most appropriate category
                  </p>
                </FormControl>

                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Price"
                    name="Price"
                    type="number"
                    size="small"
                    variant="outlined"
                    value={product.Price}
                    onChange={handleChange}
                    error={!!errors.Price}
                    helperText={errors.Price || "Enter price in EGP"}
                    fullWidth
                  />
                  <TextField
                    label="Discount (%)"
                    name="Discount"
                    type="number"
                    size="small"
                    variant="outlined"
                    value={product.Discount}
                    onChange={handleChange}
                    helperText="Optional"
                    fullWidth
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Weight"
                    name="Weight"
                    size="small"
                    variant="outlined"
                    value={product.Weight}
                    onChange={handleChange}
                    helperText="Example: 500g, 1.5kg"
                    fullWidth
                  />
                  <TextField
                    label="Dimensions"
                    name="Dimensions"
                    size="small"
                    variant="outlined"
                    value={product.Dimensions}
                    onChange={handleChange}
                    helperText="Format: LxWxH (cm)"
                    fullWidth
                  />
                </div>

                <TextField
                  label="Stock"
                  name="Stock"
                  type="number"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={product.Stock}
                  onChange={handleChange}
                  error={!!errors.Stock}
                  helperText={errors.Stock || "Enter available quantity"}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h3 className="text-[#126090] font-semibold">
                    Product Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add description, variants, and images
                  </p>
                </div>

                <TextField
                  label="Description"
                  name="Description"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  variant="outlined"
                  value={product.Description}
                  onChange={handleChange}
                  error={!!errors.Description}
                  helperText={
                    errors.Description || "Provide a detailed description"
                  }
                />

                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Colors</InputLabel>
                  <Select
                    multiple
                    name="ColorNames"
                    value={product.ColorNames}
                    onChange={handleMultiSelectChange("ColorNames")}
                    label="Colors"
                    renderValue={(selected) => (
                      <div className="flex flex-wrap gap-1">
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </div>
                    )}
                    error={!!errors.ColorNames}
                  >
                    {options.colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        <Checkbox
                          checked={product.ColorNames.includes(color)}
                        />
                        <ListItemText primary={color} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.ColorNames && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ColorNames}
                    </p>
                  )}
                </FormControl>

                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Sizes</InputLabel>
                  <Select
                    multiple
                    name="SizeNames"
                    value={product.SizeNames}
                    onChange={handleMultiSelectChange("SizeNames")}
                    label="Sizes"
                    renderValue={(selected) => (
                      <div className="flex flex-wrap gap-1">
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </div>
                    )}
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.SizeNames}
                    </p>
                  )}
                </FormControl>

                <div className="p-3 border rounded-lg bg-gray-50 space-y-3">
                  <div>
                    <label className="font-medium text-[#126090] block mb-1">
                      Main Product Image
                    </label>
                    <input
                      type="file"
                      name="homePicture"
                      onChange={handleFileChange}
                      className="w-full text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#126090] file:text-white hover:file:bg-blue-700"
                      required
                    />
                    {errors.homePicture && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.homePicture}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-[#126090] block mb-1">
                      Additional Images
                    </label>
                    <input
                      type="file"
                      name="otherPictures"
                      multiple
                      onChange={handleFileChange}
                      className="w-full text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#126090] file:text-white hover:file:bg-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={productStatus === "loading"}
              sx={{
                backgroundColor: "#126090",
                "&:hover": {
                  backgroundColor: "#0d4d6e",
                },
                height: "42px",
                fontSize: "1rem",
              }}
            >
              {productStatus === "loading"
                ? "Publishing..."
                : "Publish Product"}
            </Button>
            <p className="text-center text-gray-600 text-xs mt-2">
              Make sure all required fields are filled before publishing
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishProductCard;
