import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  Paper,
  Tooltip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import APILINK from "../../../../Constants";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import Loading from "../../../Components/Shared/Loading/Loading";

const OwnerOwnDeals = () => {
  const [dealsData, setDealsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [currentDeal, setCurrentDeal] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const token = localStorage.getItem("accessToken");
  const base_url = APILINK;

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url}/api/Deals/GetAllDealsForSpecificBusinessOwner`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDealsData(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch deals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleEditOpen = (deal, id) => {
    setCurrentDeal({ ...deal });
    setCurrentId(id);
    setOpenEdit(true);
  };

  const handleEditChange = (e) => {
    setCurrentDeal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `${base_url}/api/Deals/EditDeal/${currentId}`,
        {
          BusinessName: currentDeal.BusinessName,
          Description: currentDeal.Description,
          OfferMoney: currentDeal.OfferMoney,
          OfferDeal: currentDeal.OfferDeal,
          CategoryId: currentDeal.CategoryId,
          Pictures: currentDeal.Pictures,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Success", "Deal updated successfully", "success");
      setOpenEdit(false);
      fetchDeals();
    } catch {
      Swal.fire("Error", "Failed to update deal", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This deal will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${base_url}/api/Deals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Deal has been deleted.", "success");
        fetchDeals();
      } catch {
        Swal.fire("Error", "Failed to delete deal", "error");
      }
    }
  };

  const openImageModal = (img) => {
    setSelectedImage(img);
    setOpenImageViewer(true);
  };

  if (loading)
    return (
      <>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Loading />
        </Box>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
        <Footer />
      </>
    );

  if (!dealsData) return null;

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: "linear-gradient(to right, #f7f9fc, #edf2f7)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#2d3748",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Deals by {dealsData.BusinessOwnerName}
          </Typography>
          <Divider sx={{ mb: 3, width: "50%", mx: "auto" }} />
        </Paper>

        <Grid container spacing={3}>
          {dealsData.Deals.map((deal, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    pt: "56.25%", // 16:9 aspect ratio
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      deal.Pictures[0] ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={deal.BusinessName}
                    onClick={() => openImageModal(deal.Pictures[0])}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: deal.IsApproved
                        ? "success.main"
                        : "warning.main",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {deal.IsApproved ? "Approved" : "Pending"}
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "#2d3748",
                    }}
                  >
                    {deal.BusinessName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      height: "4.5em",
                    }}
                  >
                    {deal.Description}
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    spacing={1}
                    sx={{ mb: 3 }}
                  >
                    <Chip
                      label={`Category: ${deal.CategoryName}`}
                      color="primary"
                      size="small"
                      sx={{ fontSize: "0.7rem", mb: 1 }}
                    />
                    <Chip
                      label={`Offer: ${deal.OfferDeal}%`}
                      size="small"
                      sx={{ bgcolor: "#e3f2fd", fontSize: "0.7rem", mb: 1 }}
                    />
                    <Chip
                      label={`Money: $${deal.OfferMoney}`}
                      size="small"
                      sx={{ bgcolor: "#e8f5e9", fontSize: "0.7rem", mb: 1 }}
                    />
                  </Stack>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Estimated Price:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ${deal.EstimatedPrice}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Manufacturing Cost:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ${deal.ManufacturingCost}
                      </Typography>
                    </Stack>
                  </Box>

                  {deal.Pictures.length > 1 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: "block" }}
                      >
                        Additional Images:
                      </Typography>
                      <Grid container spacing={1}>
                        {deal.Pictures.slice(1).map((img, i) => (
                          <Grid item xs={4} key={i}>
                            <Box
                              sx={{
                                pt: "100%", // 1:1 aspect ratio
                                position: "relative",
                                borderRadius: 1,
                                overflow: "hidden",
                                cursor: "pointer",
                              }}
                              onClick={() => openImageModal(img)}
                            >
                              <img
                                src={
                                  img ||
                                  "https://via.placeholder.com/80?text=N/A"
                                }
                                alt={`${deal.BusinessName} extra ${i + 1}`}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mt: 3, pt: 2, borderTop: "1px solid #edf2f7" }}
                  >
                    <Tooltip title="Edit Deal">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditOpen(deal, idx + 1)}
                        sx={{
                          bgcolor: "rgba(25, 118, 210, 0.08)",
                          "&:hover": { bgcolor: "rgba(25, 118, 210, 0.12)" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Deal">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(idx + 1)}
                        sx={{
                          bgcolor: "rgba(211, 47, 47, 0.08)",
                          "&:hover": { bgcolor: "rgba(211, 47, 47, 0.12)" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            px: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1, pt: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Edit Deal
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Business Name"
            name="BusinessName"
            fullWidth
            value={currentDeal?.BusinessName || ""}
            onChange={handleEditChange}
            variant="outlined"
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Description"
            name="Description"
            fullWidth
            multiline
            rows={4}
            value={currentDeal?.Description || ""}
            onChange={handleEditChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Offer Money"
                name="OfferMoney"
                type="number"
                fullWidth
                value={currentDeal?.OfferMoney || ""}
                onChange={handleEditChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ mr: 1 }}>
                      $
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Offer Deal"
                name="OfferDeal"
                type="number"
                fullWidth
                value={currentDeal?.OfferDeal || ""}
                onChange={handleEditChange}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <Box component="span" sx={{ ml: 1 }}>
                      %
                    </Box>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            label="Category ID"
            name="CategoryId"
            type="number"
            fullWidth
            value={currentDeal?.CategoryId || ""}
            onChange={handleEditChange}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenEdit(false)}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Viewer Dialog */}
      <Dialog
        open={openImageViewer}
        onClose={() => setOpenImageViewer(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxHeight: "90vh",
            maxWidth: "90vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setOpenImageViewer(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            ✕
          </IconButton>
          <img
            src={selectedImage}
            alt="Enlarged view"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Dialog>

      <Footer />
    </>
  );
};

export default OwnerOwnDeals;
