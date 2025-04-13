import { useState } from "react";
import profile1 from "../assets/Deals/profile1.png";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
      border: "1px solid #ddd",
      borderRadius: 2,
      bgcolor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
    }}
  >
    {image ? (
      <Box
        component="img"
        src={image}
        alt="Uploaded image"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
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
          }}
        />
        <Typography variant="body2">{label}</Typography>
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

// Component for the user profile section
const UserProfileHeader = ({ onClose }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        component="img"
        src={profile1}
        alt="User Avatar"
        sx={{ width: 64, height: 64, borderRadius: 2 }}
      />
      <Box>
        <Typography variant="h6" fontWeight="medium">
          Mohamed Ali
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: 2333669591
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CheckCircleIcon color="primary" fontSize="small" />
          <Typography variant="body2" color="primary" fontWeight="medium">
            Verified
          </Typography>
        </Box>
      </Box>
    </Box>
    <IconButton
      color="error"
      sx={{ position: "absolute", top: 16, right: 16 }}
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

// Main component
const DealPublishCard = ({ isOpen, onClose }) => {
  // State management
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    offerMoney: "",
    offerDeal: "",
    ManufacturingCost: "",
    EstimatedPrice: "",
  });
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);

  // Image upload handler
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file);
      setUploadedImages(newImages);
    }
  };

  // Form input change handler
  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  // Form submission handler
  const handleSubmit = () => {
    const dealData = {
      ...formData,
      uploadedImages,
    };
    console.log("Publishing Deal:", dealData);
    // Reset form after submission
    setFormData({
      businessName: "",
      businessType: "",
      description: "",
      offerMoney: "",
      offerDeal: "",
      ManufacturingCost: "",
      EstimatedPrice: "",
    });
    setUploadedImages([null, null, null]);
    onClose();
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
        bgcolor: "rgba(0,0,0,0.5)",
        p: 5,
        zIndex: 50,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "70%",
          p: 3,
          borderRadius: 2,
          position: "relative",
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
              />

              <FormControl fullWidth size="small">
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={formData.businessType}
                  label="Business Type"
                  onChange={handleChange("businessType")}
                >
                  {[
                    "Retail",
                    "Technology",
                    "Food & Beverage",
                    "Service",
                    "Other",
                  ].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={handleChange("description")}
                multiline
                rows={4}
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
                color="success"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
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
                <ImageUploadBox
                  width={IMAGE_SIZES.main.width}
                  height={IMAGE_SIZES.main.height}
                  image={uploadedImages[0]}
                  onUpload={(e) => handleImageUpload(0, e)}
                  label="Upload Picture"
                />

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

export default DealPublishCard;
