import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRecommendations } from "../redux/Slices/Product-Slice/ProductCardReducer";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Chip,
  Skeleton,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const PopularRecommendations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    popularRecommendations = [],
    status,
    error,
  } = useSelector((state) => state.productCard || {});

  useEffect(() => {
    dispatch(fetchPopularRecommendations());
  }, [dispatch]);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (status === "loading") {
    return (
      <Container maxWidth="xl" className="py-16 px-4">
        <Typography
          variant="h4"
          className="mb-12 font-bold text-gray-800 text-center"
        >
          Popular Recommendations
        </Typography>
        <Grid container spacing={6}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton
                variant="rectangular"
                height={500}
                className="rounded-lg"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container maxWidth="xl" className="py-16 px-4">
        <Typography
          variant="h4"
          className="mb-12 font-bold text-gray-800 text-center"
        >
          Popular Recommendations
        </Typography>
        <Typography variant="h5" color="error" align="center">
          {error || "Error loading recommendations"}
        </Typography>
      </Container>
    );
  }

  const recommendations = popularRecommendations?.Recommendations || [];

  if (!recommendations.length) {
    return (
      <Container maxWidth="xl" className="py-16 px-4">
        <Typography
          variant="h4"
          className="mb-12 font-bold text-gray-800 text-center"
        >
          Popular Recommendations
        </Typography>
        <Typography variant="h5" color="textSecondary" align="center">
          No recommendations available at the moment
        </Typography>
      </Container>
    );
  }

  return (
    <Box className="bg-gradient-to-r from-gray-50 to-blue-100 py-24">
      <Container maxWidth="xl">
        <Box className=" mb-20">
          <Typography variant="h3" className="font-bold text-gray-900 mb-4">
            Popular Recommendations
          </Typography>
          <Typography
            variant="subtitle1"
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our most popular and highly-rated products, carefully
            selected for you
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {recommendations.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.ProductId}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className="h-full flex flex-col justify-between shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white rounded-2xl"
                  onClick={() => handleCardClick(item.ProductId)}
                >
                  <Box className="relative">
                    <CardMedia
                      component="img"
                      image={item.HomePictureUrl}
                      alt={item.ProductName}
                      className="h-[260px] w-full object-cover rounded-t-2xl"
                    />
                  </Box>
                  <CardContent className="flex-1 flex flex-col justify-between p-5 pb-3">
                    <Stack spacing={2} className="h-full">
                      <Chip
                        label={
                          item.Category || item.CategoryName || "Uncategorized"
                        }
                        size="small"
                        sx={{
                          backgroundColor: "#f3f4f6",
                          color: "#2563eb",
                          fontWeight: 500,
                          mb: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        className="font-extrabold text-gray-900 text-lg truncate mb-1"
                        title={item.ProductName}
                      >
                        {item.ProductName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="text-gray-500 text-sm mb-2"
                      >
                        By {item.AuthorName}
                      </Typography>
                      <Box className="flex items-center space-x-2 mb-2">
                        <Rating
                          value={item.AverageRating || 0}
                          precision={0.5}
                          readOnly
                          size="small"
                          icon={
                            <StarIcon
                              fontSize="inherit"
                              className="text-yellow-400"
                            />
                          }
                        />
                        <Typography
                          variant="body2"
                          className="text-gray-600 font-medium"
                        >
                          ({item.AverageRating?.toFixed(1) || "0.0"})
                        </Typography>
                      </Box>
                      <Box className="flex items-center justify-between mb-2">
                        <Box className="flex items-center space-x-2">
                          <Typography
                            variant="h5"
                            className="font-bold text-blue-600 text-xl"
                          >
                            ${item.DiscountedPrice}
                          </Typography>
                          {item.DiscountedPrice < item.Price && (
                            <Typography
                              component="span"
                              variant="body2"
                              className="text-gray-400 line-through text-base"
                            >
                              ${item.Price}
                            </Typography>
                          )}
                        </Box>
                        <Chip
                          label={`Stock: ${item.Stock || 0}`}
                          size="small"
                          sx={{
                            backgroundColor: "#e8f5e9",
                            color: "#388e3c",
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        className="text-gray-600 line-clamp-2 italic mb-2"
                      >
                        {item.RecommendationReason || "No reason provided"}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-gray-400 block text-right font-medium mt-2"
                      >
                        Added:{" "}
                        {item.CreatedAt
                          ? format(new Date(item.CreatedAt), "MMM dd, yyyy")
                          : "N/A"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularRecommendations;
