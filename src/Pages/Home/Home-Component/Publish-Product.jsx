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
  colors: ["-", "Red", "Blue", "Green", "Black", "White"],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("ProductName", product.ProductName);
    formData.append("Description", product.Description);
    formData.append("Price", product.Price);
    formData.append("Discount", product.Discount);
    formData.append("CategoryId", product.CategoryId);
    formData.append("Stock", product.Stock);
    formData.append("Dimensions", product.Dimensions);
    formData.append("Weight", product.Weight);

    product.SizeNames.forEach((size) =>
      formData.append("SizeNames[]", size)
    );
    product.ColorNames.forEach((color) =>
      formData.append("ColorNames[]", color)
    );

    if (product.homePicture) {
      formData.append("HomePicture", product.homePicture);
    }

    product.otherPictures.forEach((file) =>
      formData.append("Pictures", file)
    );

    dispatch(publishProduct(formData));
    onClose();
    Swal.fire({
      text: "Product published successfully",
      icon: "success",
    })
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 py-5 scroll-y">
      <form className="bg-white p-4 rounded-lg shadow-lg  space-y-2">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Publish Product</h2>
          <button type="button" className="text-red-500" onClick={onClose}>
            <FaTimes size={18} />
          </button>
        </div>

        <TextField
          label="Product Name"
          name="ProductName"
          fullWidth
          variant="outlined"
          value={product.ProductName}
          onChange={handleChange}
        />

        <FormControl fullWidth variant="filled" sx={{ borderRadius: "8px" }}>
          <InputLabel>Product Category</InputLabel>
          <Select
            name="CategoryId"
            value={product.CategoryId}
            onChange={handleChange}
            sx={{ backgroundColor: "#F7F7F7" }}
          >
            {allcategories.map((cat) => (
              <MenuItem key={cat.CategoryId} value={cat.CategoryId}>
                {cat.CategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="Description"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={product.Description}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Price"
            name="Price"
            type="number"
            variant="outlined"
            value={product.Price}
            onChange={handleChange}
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

        <div className="grid grid-cols-2 gap-2">
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

        <TextField
          label="Stock"
          name="Stock"
          fullWidth
          variant="outlined"
          value={product.Stock}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <FormControl sx={{ width: "49%" }} variant="filled">
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
            >
              {options.colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Checkbox checked={product.ColorNames.includes(color)} />
                  <ListItemText primary={color} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "49%" }} variant="filled">
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
            >
              {options.sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  <Checkbox checked={product.SizeNames.includes(size)} />
                  <ListItemText primary={size} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <label className="font-bold me-4 text-[#126090]">Home picture</label>
          <input type="file" name="homePicture" onChange={handleFileChange} />
        </div>

        <div>
          <label className="font-bold me-4 text-[#126090]">Other pictures</label>
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
