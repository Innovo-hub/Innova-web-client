import React, { useState } from "react";
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
const options = {
  sizes: ["sm", "M", "L", "XL", "2XL", "3XL", "4XL"],
  colors: ["Red", "Blue", "Green", "Black", "White"],
  categories: [
    "Carpets",
    "Bags",
    "Home",
    "Art",
    "Jewelry",
    "Nickles",
    "Rings",
    "Bags",
    "Men",
    "Women",
    "Watches",
    "Wood Crafting",
    "Toys",
    "Furniture",
    "Electronics",
    "Clothing",
    "Accessories",
  ],
};

const PublishProductCard = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.product.status);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    weight: "",
    dimensions: "",
    colors: [],
    sizes: [],
    stock: "",
    homePicture: null,
    otherPictures: [],
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(publishProduct(product));
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 py-5">
      <form className="bg-white p-4 rounded-lg shadow-lg w-[600px] space-y-2  ">
        <div className=" flex justify-between mb-4">
          <h2 className="text-xl font-bold">Publish Product</h2>
          <button type="button" className=" text-red-500" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>
        <TextField
          label="Product Name"
          name="name"
          fullWidth
          variant="outlined"
          value={product.name}
          onChange={handleChange}
        />
        <FormControl
          fullWidth
          variant="filled"
          sx={{ backgroundColor: "#F7F7F7", borderRadius: "8px" }}
        >
          <InputLabel>Product Category</InputLabel>
          <Select
            name="category"
            value={product.category}
            onChange={handleChange}
            sx={{
              backgroundColor: "#F7F7F7",
              "&:hover": { backgroundColor: "#e0e0e0" },
              "&.Mui-focused": { backgroundColor: "#d0d0d0" },
            }}
          >
            {options.categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={product.description}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Price"
            name="price"
            type="number"
            variant="outlined"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            label="Discount (%)"
            name="discount"
            type="number"
            variant="outlined"
            value={product.discount}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Weight (kg,g)"
            name="weight"
            type="number"
            variant="outlined"
            value={product.weight}
            onChange={handleChange}
          />
          <TextField
            label="Dimensions (LxWxH)"
            name="dimensions"
            variant="outlined"
            value={product.dimensions}
            onChange={handleChange}
          />
        </div>
        <FormControl sx={{ width: "49%", marginRight: "2%" }} variant="filled">
          <InputLabel>Colors</InputLabel>
          <Select
            multiple
            name="colors"
            value={product.colors}
            sx={{ backgroundColor: "#F7F7F7", borderRadius: "8px" }}
            onChange={handleMultiSelectChange("colors")}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-1">
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {options.colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={product.colors.includes(color)} />
                <ListItemText primary={color} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          sx={{ backgroundColor: "#F7F7F7", borderRadius: "8px", width: "49%" }}
        >
          <InputLabel>Size</InputLabel>
          <Select
            multiple
            name="sizes"
            value={product.sizes}
            onChange={handleMultiSelectChange("sizes")}
            sx={{
              backgroundColor: "#F7F7F7",
              "&:hover": { backgroundColor: "#e0e0e0" },
              "&.Mui-focused": { backgroundColor: "#d0d0d0" },
            }}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-1">
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {options.sizes.map((size) => (
              <MenuItem key={size} value={size}>
                <Checkbox checked={product.sizes.includes(size)} />
                <ListItemText primary={size} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <label className="font-bold me-4 text-[#126090]">Home picture</label>
          <input type="file" name="homePicture" onChange={handleFileChange} />
        </div>
        <div>
          <label className=" font-bold me-4 text-[#126090]">
            Other pictures
          </label>
          <input
            type="file"
            name="otherPictures"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleSubmit}
          disabled={productStatus === "loading"}
        >
          {productStatus === "loading" ? "Publishing..." : "Publish Product"}
        </Button>
      </form>
    </div>
  );
};

export default PublishProductCard;
