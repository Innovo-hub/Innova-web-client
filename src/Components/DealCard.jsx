/* eslint-disable react/prop-types */
import { useState } from "react";
import DiscussDealPopup from "../Pages/Deals/DealsInvestor/Deals-Component/Discuss-Deal";
import axios from "axios";
import APILINK from "../../Constants";
import Swal from "sweetalert2";

const DealShowCard = ({ deal }) => {
  const [discussPopupOpen, setDiscussPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const role = localStorage.getItem("role");

  // Ensure deal.productImages is always an array
  const productImages = Array.isArray(deal.productImages)
    ? deal.productImages
    : [];

  console.log("Deal data received:", deal);

  const handleOpenDiscussPopup = () => {
    setDiscussPopupOpen(true);
  };

  const handleCloseDiscussPopup = () => {
    setDiscussPopupOpen(false);
  };

  const handleAcceptDeal = async (dealId) => {
    if (!dealId) {
      console.error("No deal ID provided");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid deal information",
      });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Deals/accept-offer`,
        {
          DealId: dealId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deal Accepted",
          text: "You have successfully accepted the deal, wait for the owner to respond.",
        });
      }
    } catch (error) {
      console.error("Error accepting deal:", error);
      Swal.fire({
        icon: "error",
        title: "Deal Acceptance Failed",
        text: "There was an error accepting the deal. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDiscussion = async (dealId, message) => {
    if (!dealId || !message) {
      console.error(
        "Missing required information - dealId:",
        dealId,
        "message:",
        message
      );
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const payload = {
        DealId: dealId,
        Message: message,
      };
      console.log("Sending discussion request with payload:", payload);

      const response = await axios.post(
        `${APILINK}/api/Deals/discuss-offer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Discussion success response:", response.data);
        Swal.fire({
          icon: "success",
          title: "Deal Discussed",
          text: "You have successfully discussed the deal.",
        });
      }
    } catch (error) {
      console.error("Error discussing deal:", error);
      console.error("Error response data:", error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Deal Discussion Failed",
        text:
          error.response?.data?.message ||
          "There was an error discussing the deal. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#126090] to-[#1a8ac6] p-4 border-b border-gray-200 relative">
          {/* Warning icon moved to header */}
          {/* <div className="absolute right-4 top-4 w-6 h-6 bg-white rounded-full border-2 border-red-500 flex items-center justify-center shadow-lg z-10">
            <span className="text-red-500 font-bold text-sm">!</span>
          </div> */}

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-xl">
              <img
                src={
                  deal.ownerImage ||
                  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={deal.ownerName || "Business Owner"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {deal.ownerName || "Unknown Owner"}
                </h3>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-xs text-white font-medium">
                    Verified
                  </span>
                </div>
              </div>
              <p className="text-white/80 text-sm">
                ID: {deal.ownerId || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left side content */}
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-base mb-1">
                  <span className="font-bold text-[#126090]">
                    Business Name:{" "}
                  </span>
                  <span className="font-semibold text-black">
                    {deal.businessName || "N/A"}
                  </span>
                </p>
                <p className="text-base">
                  <span className="font-bold text-[#126090]">
                    Business Type:{" "}
                  </span>
                  <span className="font-semibold text-black">
                    {deal.category || "Uncategorized"}
                  </span>
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="font-bold text-[#126090] text-lg mb-2">
                  Description
                </p>
                <p className="text-base text-gray-600 w-[80%]">
                  {deal.description || "No description available"}
                </p>
              </div>

              {/* Offer details */}
              <div className="mb-4">
                <p className="text-base text-[#126090]">
                  <span className="font-bold">Offer Money: </span>
                  <span className="font-bold">
                    {deal.offerMoney || "0 EGP"}
                  </span>
                  <span className="mx-4"></span>
                  <span className="font-bold">Offer Deal: </span>
                  <span className="font-bold">{deal.offerDeal || "0%"}</span>
                </p>
              </div>

              {/* Action buttons */}
              {role === "Investor" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAcceptDeal(deal.dealId)}
                    disabled={loading}
                    className={`px-16 py-2 rounded-md ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition-colors`}
                  >
                    {loading ? "Processing..." : "Accept Deal"}
                  </button>
                  <button
                    onClick={handleOpenDiscussPopup}
                    disabled={loading}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-16 py-2 rounded-md transition-colors"
                  >
                    Discuss Deal
                  </button>
                </div>
              )}
            </div>

            {/* Right side - Product images */}
            <div className="relative w-full lg:w-[450px] bg-gray-50 p-4 rounded-xl">
              {/* Image gallery container */}
              <div className="flex gap-3">
                {/* Main larger image on the left */}
                <div className="flex-[2]">
                  <div className="w-full h-[280px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                    <img
                      src={
                        productImages[selectedImage] ||
                        "https://via.placeholder.com/280x280?text=No+Image"
                      }
                      alt={`Deal ${selectedImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Two smaller stacked images on the right */}
                <div className="flex-1 flex flex-col gap-3">
                  {[...Array(2)].map((_, index) => {
                    const imageIndex =
                      (selectedImage + index + 1) % productImages.length;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(imageIndex)}
                        className={`relative w-full h-[135px] rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg ${
                          selectedImage === imageIndex
                            ? "ring-2 ring-blue-500 scale-105"
                            : "hover:scale-105"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 ${
                            selectedImage === imageIndex
                              ? ""
                              : "hover:bg-black/10"
                          } transition-colors`}
                        >
                          <img
                            src={
                              productImages[imageIndex] ||
                              "https://via.placeholder.com/135x135?text=No+Image"
                            }
                            alt={`Thumbnail ${imageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion popup */}
      {discussPopupOpen && (
        <DiscussDealPopup
          open={discussPopupOpen}
          handleClose={handleCloseDiscussPopup}
          dealId={deal.dealId}
          onSubmit={handleSubmitDiscussion}
        />
      )}
    </div>
  );
};

export default DealShowCard;
