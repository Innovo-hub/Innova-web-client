import { useState } from "react";
import profile1 from "../assets/Deals/profile1.png";
import { FaTimes, FaUpload, FaCheckCircle } from "react-icons/fa";
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

const DealPublishCard = ({ isOpen, onClose }) => {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [offerMoney, setOfferMoney] = useState("");
  const [offerDeal, setOfferDeal] = useState("");
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file);
      setUploadedImages(newImages);
    }
  };

  const handleSubmit = () => {
    const dealData = {
      businessName,
      businessType,
      description,
      offerMoney,
      offerDeal,
      uploadedImages,
    };
    console.log("Publishing Deal:", dealData);
    // Here you can send `dealData` to an API
    setBusinessName("");
    setBusinessType("");
    setDescription("");
    setOfferMoney("");
    setOfferDeal("");
    setUploadedImages([null, null, null]);
    onClose();
  };

  if (!isOpen) return null;

  // Fixed dimensions for image upload containers
  const mainImageSize = { width: 250, height: 350 };
  const smallImageSize = { width: 165, height: 165 };

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
        {/* User Info */}
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

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* First grid for publishing data inputs */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                size="small"
              />

              <FormControl fullWidth size="small">
                <InputLabel>Business Type</InputLabel>
                <Select
                  value={businessType}
                  label="Business Type"
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <MenuItem value="Retail">Retail</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Food">Food & Beverage</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Offer Money"
                  variant="outlined"
                  value={offerMoney}
                  onChange={(e) => setOfferMoney(e.target.value)}
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
                  value={offerDeal}
                  onChange={(e) => setOfferDeal(e.target.value)}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
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

          {/* Second grid for uploading images */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Main large image upload */}
                <Box
                  component="label"
                  sx={{
                    width: mainImageSize.width,
                    height: mainImageSize.height,
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
                  {uploadedImages[0] ? (
                    <Box
                      component="img"
                      src={uploadedImages[0]}
                      alt="Uploaded 1"
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
                      <UploadIcon sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="body2">Upload Picture</Typography>
                    </Box>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(0, e)}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </Box>

                {/* Two smaller image uploads */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[1, 2].map((index) => (
                    <Box
                      key={index}
                      component="label"
                      sx={{
                        width: smallImageSize.width,
                        height: smallImageSize.height,
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
                      {uploadedImages[index] ? (
                        <Box
                          component="img"
                          src={uploadedImages[index]}
                          alt={`Uploaded ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
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
                          <UploadIcon sx={{ fontSize: 24, mb: 0.5 }} />
                          <Typography variant="body2">Upload</Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(index, e)}
                        style={{ display: "none" }}
                        accept="image/*"
                      />
                    </Box>
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
