import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Chip, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button
} from '@mui/material';
import Swal from 'sweetalert2';
import APILINK from '../../../../Constants';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Loading from '../../../Components/Shared/Loading/Loading';

const OwnerOwnDeals = () => {
  const [dealsData, setDealsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [currentDeal, setCurrentDeal] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const token = localStorage.getItem('accessToken');
  const base_url = APILINK;

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/api/Deals/GetAllDealsForSpecificBusinessOwner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDealsData(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch deals.');
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
    setCurrentDeal(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(`${base_url}/api/Deals/EditDeal/${currentId}`, {
        BusinessName: currentDeal.BusinessName,
        Description: currentDeal.Description,
        OfferMoney: currentDeal.OfferMoney,
        OfferDeal: currentDeal.OfferDeal,
        CategoryId: currentDeal.CategoryId,
        Pictures: currentDeal.Pictures
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire('Success', 'Deal updated successfully', 'success');
      setOpenEdit(false);
      fetchDeals();
    } catch {
      Swal.fire('Error', 'Failed to update deal', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This deal will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${base_url}/api/Deals/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Deal has been deleted.', 'success');
        fetchDeals();
      } catch {
        Swal.fire('Error', 'Failed to delete deal', 'error');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center my-12"><Loading /></div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!dealsData) return null;

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl text-center font-bold mb-4">
          Deals by {dealsData.BusinessOwnerName}
        </h2>
        <Grid container spacing={3}>
          {dealsData.Deals.map((deal, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card className="h-full">
                <CardMedia
                  component="img"
                  height="180"
                  image={deal.Pictures[0]}
                  alt={deal.BusinessName}
                  className="object-cover"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{deal.BusinessName}</Typography>
                  <Typography variant="body2" color="text.secondary">{deal.Description}</Typography>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Chip label={`Category: ${deal.CategoryName}`} color="primary" size="small" />
                    <Chip label={`Offer: ${deal.OfferDeal}%`} size="small" />
                    <Chip label={`Money: $${deal.OfferMoney}`} size="small" />
                    <Chip label={`Estimated: $${deal.EstimatedPrice}`} size="small" />
                    <Chip label={`Manufacturing: $${deal.ManufacturingCost}`} size="small" />
                    <Chip
                      label={deal.IsApproved ? 'Approved' : 'Pending'}
                      color={deal.IsApproved ? 'success' : 'warning'}
                      size="small"
                    />
                  </div>
                  {deal.Pictures.length > 1 && (
                    <div className="mt-3 grid grid-cols-3 gap-1">
                      {deal.Pictures.slice(1).map((img, i) => (
                        <img key={i} src={img} alt="Extra" className="w-full h-16 object-cover rounded" />
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditOpen(deal, idx + 1)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(idx + 1)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Deal</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Business Name"
            name="BusinessName"
            fullWidth
            value={currentDeal?.BusinessName || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="Description"
            fullWidth
            value={currentDeal?.Description || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Offer Money"
            name="OfferMoney"
            type="number"
            fullWidth
            value={currentDeal?.OfferMoney || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Offer Deal"
            name="OfferDeal"
            type="number"
            fullWidth
            value={currentDeal?.OfferDeal || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Category ID"
            name="CategoryId"
            type="number"
            fullWidth
            value={currentDeal?.CategoryId || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
};

export default OwnerOwnDeals;
