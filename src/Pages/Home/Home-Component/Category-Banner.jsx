import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import S1 from "../../../assets/Products/s1.jpg";
import S2 from "../../../assets/Products/s2.jpg";
import S3 from "../../../assets/Products/s3.jpg";
import Categorieslist from "./Categories-list";
import MeltableSlider from "../Home-Slider/MeltableSlider";

const CategoryBanner = () => {
  const navigate = useNavigate();

  const images = [S1, S2, S3];

  // Thumbnail data
  const thumbnails = [
    {
      image: S1,
      title: "Necklace Product",
      description: "Discover unique artisan crafts",
      categoryId: "9",
    },
    {
      image: S2,
      title: "Home Decor",
      description: "Beautiful items for your home",
      categoryId: "2",
    },
    {
      image: S3,
      title: "Accessories",
      description: "Complete your style",
      categoryId: "3",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 lg:px-8 px-4 my-8 gap-8">
      <div className="col-span-1 w-full">
        <Categorieslist />
      </div>
      <div className="lg:col-span-3 col-span-1 my-2">
        <Container maxWidth="lg" className="px-0 sm:px-2">
          {/* Main Slider */}
          <Paper elevation={3} className="rounded-lg mb-4">
            <MeltableSlider images={images} autoPlay={true} interval={3000} />
          </Paper>

          {/* Thumbnail Images Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {thumbnails.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => navigate(`/category/${item.categoryId}`)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <Typography
                    variant="subtitle1"
                    className="text-white font-bold"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-white/80 hidden sm:block"
                  >
                    {item.description}
                  </Typography>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-main-color/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-full transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                      <Typography
                        variant="button"
                        className="text-main-color font-medium"
                      >
                        View Collection
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CategoryBanner;
