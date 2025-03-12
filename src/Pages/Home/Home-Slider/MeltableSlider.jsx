import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MeltableSlider = ({ images, autoPlay = true, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const handleDotClick = (index) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, activeIndex]);

  return (
    <Box className="relative w-full h-64 xl:h-96 overflow-hidden rounded-xl">
      {/* Images */}
      {images.map((image, index) => (
        <Box
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover transition-all duration-500
            ${activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}
            ${
              isTransitioning && activeIndex === index
                ? ""
                : ""
            }
          `}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}

      {/* Navigation arrows */}
      <Box className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <IconButton
          onClick={handlePrev}
          className="bg-white/30 hover:bg-white/50 text-gray-950"
          size="small"
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          className="bg-white/30 hover:bg-white/50 text-gray-800"
          size="small"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Indicator dots */}
      <Box className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all
              ${
                activeIndex === index
                  ? "bg-[#126090] w-4"
                  : "bg-white/50 hover:bg-white/70"
              }
            `}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MeltableSlider;
