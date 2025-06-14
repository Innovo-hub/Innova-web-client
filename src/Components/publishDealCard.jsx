import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import profile1 from "../assets/Deals/profile1.png";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import APILINK from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../redux/Slices/Category-Slice/CategoryReducer";

// Component for image upload area
const ImageUploadBox = ({
  width,
  height,
  image,
  onUpload,
  label = "Upload",
}) => (
  <Box
    component="label"
    sx={{
      width,
      height,
      border: "2px dashed #ddd",
      borderRadius: 2,
      bgcolor: "#f8f8f8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "primary.main",
        bgcolor: "#f0f7ff",
      },
    }}
  >
    {image ? (
      <Box
        component="img"
        src={image}
        alt="Uploaded image"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "text.secondary",
        }}
      >
        <UploadIcon
          sx={{
            fontSize: label === "Upload Picture" ? 32 : 24,
            mb: label === "Upload Picture" ? 1 : 0.5,
            color: "primary.main",
          }}
        />
        <Typography variant="body2" color="primary">
          {label}
        </Typography>
      </Box>
    )}
    <input
      type="file"
      onChange={onUpload}
      style={{ display: "none" }}
      accept="image/*"
    />
  </Box>
);

ImageUploadBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
  label: PropTypes.string,
};

// Component for the user profile section
const UserProfileHeader = ({ onClose }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 4,
      position: "relative",
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 500,
        color: "text.primary",
        fontSize: "1.5rem",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-12px",
          left: 0,
          width: "60px",
          height: "3px",
          backgroundColor: "primary.main",
          borderRadius: "2px",
        },
      }}
    >
      Add New Deal
    </Typography>
    <IconButton
      color="error"
      size="small"
      sx={{
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "rotate(90deg)",
          bgcolor: "error.light",
        },
      }}
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);
UserProfileHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// Main component
const DealPublishCard = ({ isOpen, onClose }) => {
  // State management
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    offerMoney: "",
    offerDeal: "",
    ManufacturingCost: "",
    EstimatedPrice: "",
    categoryId: "",
  });
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.businessName)
      newErrors.businessName = "Business name is required";
    if (!formData.categoryId)
      newErrors.businessType = "Business type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.offerMoney) newErrors.offerMoney = "Offer money is required";
    if (!formData.offerDeal)
      newErrors.offerDeal = "Offer percentage is required";
    if (
      formData.offerDeal &&
      (parseFloat(formData.offerDeal) < 0 ||
        parseFloat(formData.offerDeal) > 100)
    ) {
      newErrors.offerDeal = "Percentage must be between 0 and 100";
    }
    if (!uploadedImages[0]) newErrors.mainImage = "Main image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const { allcategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  // Image upload handler
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        // 5MB limit
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please upload an image smaller than 5MB",
        });
        return;
      }
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file);
      setUploadedImages(newImages);
    }
  };

  // Form input change handler
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field === "businessType" ? "categoryId" : field]: event.target.value,
    });
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  // Form submission handler
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Create FormData object to handle file uploads
        const formDataToSend = new FormData();

        // Append the form data fields
        formDataToSend.append("BusinessName", formData.businessName);
        formDataToSend.append("Description", formData.description);
        formDataToSend.append("OfferMoney", formData.offerMoney);
        formDataToSend.append("OfferDeal", formData.offerDeal);
        formDataToSend.append("CategoryId", formData.categoryId);
        formDataToSend.append("ManufacturingCost", formData.ManufacturingCost);
        formDataToSend.append("EstimatedPrice", formData.EstimatedPrice);

        // Append the image files
        for (let i = 0; i < uploadedImages.length; i++) {
          if (uploadedImages[i]) {
            // Convert data URL to blob
            const blob = await fetch(uploadedImages[i]).then((r) => r.blob());
            formDataToSend.append(`Pictures`, blob, `image${i}.jpg`);
          }
        }

        const response = await axios.post(
          `${APILINK}/api/Deals/add`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Deal Published Successfully!",
          text:
            response.data.message ||
            "Your deal has been published and is now visible to investors.",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // Reset form after submission
          setFormData({
            businessName: "",
            description: "",
            offerMoney: "",
            offerDeal: "",
            ManufacturingCost: "",
            EstimatedPrice: "",
            categoryId: "",
          });
          setUploadedImages([null, null, null]);
          onClose();
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            "Failed to publish deal. Please try again.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields correctly.",
      });
    }
  };

  if (!isOpen) return null;

  // Image size constants
  const IMAGE_SIZES = {
    main: { width: 250, height: 350 },
    small: { width: 165, height: 165 },
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.7)",
        p: 5,
        zIndex: 1300,
        backdropFilter: "blur(5px)",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "80%",
          maxWidth: 1200,
          maxHeight: "90vh",
          p: 3,
          borderRadius: 3,
          position: "relative",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
            "&:hover": {
              background: "#555",
            },
          },
        }}
      >
        {/* User Profile Section */}
        <UserProfileHeader onClose={onClose} />

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Form Section */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                value={formData.businessName}
                onChange={handleChange("businessName")}
                size="small"
                error={!!errors.businessName}
                helperText={errors.businessName}
                required
              />

              <FormControl
                fullWidth
                size="small"
                error={!!errors.businessType}
                required
              >
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={formData.categoryId}
                  label="Business Type"
                  onChange={handleChange("businessType")}
                >
                  {allcategories.map((type) => (
                    <MenuItem key={type.CategoryId} value={type.CategoryId}>
                      {type.CategoryName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.businessType && (
                  <FormHelperText>{errors.businessType}</FormHelperText>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={handleChange("description")}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
                required
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Offer Money"
                  variant="outlined"
                  value={formData.offerMoney}
                  onChange={handleChange("offerMoney")}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.offerMoney}
                  helperText={errors.offerMoney}
                  required
                />

                <TextField
                  fullWidth
                  label="Offer Percentage"
                  variant="outlined"
                  value={formData.offerDeal}
                  onChange={handleChange("offerDeal")}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  error={!!errors.offerDeal}
                  helperText={errors.offerDeal}
                  required
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Manufacturing Cost"
                  variant="outlined"
                  value={formData.ManufacturingCost}
                  onChange={handleChange("ManufacturingCost")}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Estimated Price"
                  variant="outlined"
                  value={formData.EstimatedPrice}
                  onChange={handleChange("EstimatedPrice")}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                Publish Deal
              </Button>
            </Box>
          </Grid>

          {/* Image Upload Section */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Main large image upload */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <ImageUploadBox
                    width={IMAGE_SIZES.main.width}
                    height={IMAGE_SIZES.main.height}
                    image={uploadedImages[0]}
                    onUpload={(e) => handleImageUpload(0, e)}
                    label="Upload Picture"
                  />
                  {errors.mainImage && (
                    <Typography color="error" variant="caption">
                      {errors.mainImage}
                    </Typography>
                  )}
                </Box>

                {/* Two smaller image uploads */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[1, 2].map((index) => (
                    <ImageUploadBox
                      key={index}
                      width={IMAGE_SIZES.small.width}
                      height={IMAGE_SIZES.small.height}
                      image={uploadedImages[index]}
                      onUpload={(e) => handleImageUpload(index, e)}
                      label="Upload"
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

DealPublishCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DealPublishCard;
