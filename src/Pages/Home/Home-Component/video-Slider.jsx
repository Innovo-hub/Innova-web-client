import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const VideoSlider = () => {
  // تحويل روابط يوتيوب إلى تنسيق قابل للتضمين
  const videos = useMemo(
    () => [
      {
        id: "Hq44MK9PpNA",
      },
      {
        id: "-ECqbfX0IUA",
      },
      {
        id: "6C0dEf77xgM",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setVideoWidth(window.innerWidth * 0.5);
      setVideoHeight(window.innerHeight * 0.5);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  }, [videos.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  }, [videos.length]);

  return (
    <Box className="flex flex-col items-center justify-center h-full">
      <Box className="relative flex items-center justify-center w-full">
        <IconButton
          onClick={prevSlide}
          className="absolute left-2 z-10 text-white"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <div
          className="overflow-hidden"
          style={{
            width: `${videoWidth}px`,
            maxWidth: "100%",
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {videos.map((video, index) => (
              <div
                className="flex-shrink-0"
                key={video.id}
                style={{ width: `${videoWidth}px` }}
              >
                <iframe
                  style={{
                    width: "100%",
                    height: `${videoHeight}px`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        <IconButton
          onClick={nextSlide}
          className="absolute right-2 z-10 text-white"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      <Box className="flex justify-center mt-4">
        {videos.map((_, index) => (
          <div
            key={`dot-${index}`}
            className={`h-3 w-3 mx-1 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            } cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default VideoSlider;
