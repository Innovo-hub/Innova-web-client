/* eslint-disable react/prop-types */
import { useState } from "react";
import DiscussDealPopup from "../Pages/Deals/DealsInvestor/Deals-Component/Discuss-Deal";
import axios from "axios";
import APILINK from "../../Constants";
import Swal from "sweetalert2";

const DealShowCard = ({ deal }) => {
  // console.log("Deal data:", deal); // Debugging line to check deal data

  const [discussPopupOpen, setDiscussPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenDiscussPopup = () => {
    setDiscussPopupOpen(true);
  };

  const handleCloseDiscussPopup = () => {
    setDiscussPopupOpen(false);
  };
  //// console.log(deal);
  const handleAcceptDeal = async (dealId) => {
    try {
      // console.log("Accepting deal with ID:", dealId);
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
          text: "You have successfully accepted the deal,wait for the owner to respond.",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Deal Acceptance Failed",
        text: "There was an error accepting the deal. Please try again later.",
      });
    }
  };

  const handleSubmitDiscussion = async (dealId, message) => {
       try {
      // console.log("Accepting deal with ID:", dealId);
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Deal Discussion Failed",
        text: "There was an error Discussing the deal. Please try again later.",
      });
    }


  const role = localStorage.getItem("role");

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
                  alt={deal.ownerName}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{deal.ownerName}</h3>
                <p className="text-sm text-gray-500">ID: {deal.ownerId}</p>
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
                  {deal.businessName}
                </span>
              </p>
              <p className="text-base">
                <span className="font-bold text-[#126090]">
                  Business Type:{" "}
                </span>
                <span className="font-semibold text-black">
                  {deal.category}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="font-bold text-[#126090] text-lg mb-2">
                Description
              </p>
              <p className="text-base text-gray-600 w-[80%]">
                {deal.description}
              </p>
            </div>

            {/* Offer details */}
            <div className="mb-4">
              <p className="text-base text-[#126090]">
                <span className="font-bold">Offer Money: </span>
                <span className="font-bold">{deal.offerMoney}</span>
                <span className="mx-4"></span>
                <span className="font-bold">Offer Deal: </span>
                <span className="font-bold">{deal.offerDeal}</span>
              </p>
            </div>

            {/* Action buttons */}
            {role === "Investor" ? (
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleAcceptDeal(deal.dealId);
                    }}
                    className="bg-green-500 text-white px-16 py-2 rounded-md"
                  >
                    {loading ? "Accepting..." : "Accept Deal"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-amber-600 text-white px-16 py-2 rounded-md"
                    onClick={handleOpenDiscussPopup}
                  >
                    Discuss Deal
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right side - Product images */}
          <div className="relative w-full lg:w-[350px]">
            {/* icon ! */}
            <div className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full border-2 border-red-500 flex items-center justify-center">
              <span className="text-red-500 font-bold">!</span>
            </div>

            {/* Main image(Bigger) */}
            <div className="w-full mt-8 mb-2">
              <img
                src={deal.productImages[0]}
                alt="Main Product"
                className="w-full h-[250px] object-cover rounded-lg"
              />
            </div>

            {/* Small images(2image) */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <img
                  src={deal.productImages[1]}
                  alt="Product"
                  className="w-full h-[100px] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src={deal.productImages[2]}
                  alt="Product"
                  className="w-full h-[100px] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Timestamp */}
            <p className="text-xs text-gray-500 text-right mt-2">
              {deal.ApprovedAt}
            </p>
          </div>
        </div>
      </div>

      {/* Discuss Deal Popup */}
      <DiscussDealPopup
        open={discussPopupOpen}
        handleClose={handleCloseDiscussPopup}
        dealId={deal.dealId}
        onSubmit={handleSubmitDiscussion}
      />
    </div>
  );
};

export default DealShowCard;
