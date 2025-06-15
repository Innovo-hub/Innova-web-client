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
      console.error("Missing required information");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Deals/discuss-offer`,
        {
          DealId: dealId,
          Message: message,
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
          title: "Deal Discussed",
          text: "You have successfully discussed the deal.",
        });
      }
    } catch (error) {
      console.error("Error discussing deal:", error);
      Swal.fire({
        icon: "error",
        title: "Deal Discussion Failed",
        text: "There was an error discussing the deal. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left side content */}
          <div className="flex-1">
            {/* Owner info section */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16">
                <img
                  src={
                    deal.ownerImage ||
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={deal.ownerName || "Business Owner"}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {deal.ownerName || "Unknown Owner"}
                </h3>
                <p className="text-sm text-gray-500">
                  ID: {deal.ownerId || "N/A"}
                </p>
                <div className="flex items-center gap-1 text-blue-500">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>

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
                <span className="font-bold">{deal.offerMoney || "0 EGP"}</span>
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
          <div className="relative w-full lg:w-[350px]">
            {/* Warning icon */}
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full border-2 border-red-500 flex items-center justify-center">
              <span className="text-red-500 font-bold">!</span>
            </div>

            {/* Main image */}
            <div className="w-full h-[250px] rounded-lg overflow-hidden mb-4">
              <img
                src={
                  productImages[selectedImage] ||
                  "https://via.placeholder.com/350x250?text=No+Image"
                }
                alt={`Deal ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={
                        image || "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discussion popup */}
      {discussPopupOpen && (
        <DiscussDealPopup
          isOpen={discussPopupOpen}
          onClose={handleCloseDiscussPopup}
          onSubmit={(message) => handleSubmitDiscussion(deal.dealId, message)}
          dealId={deal.dealId}
        />
      )}
    </div>
  );
};

export default DealShowCard;
