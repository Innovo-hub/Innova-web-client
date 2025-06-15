import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDeals } from "../../../redux/Slices/Deals-Slice/DealsReducer.jsx";
import DealPublishCard from "../../../Components/publishDealCard.jsx";
import Footer from "../../../Components/Footer.jsx";
import HomeBanner from "../../../Components/Home-Banner.jsx";
import Navbar from "../../../Components/Navbar.jsx";
import OwnerBanner from "./DealsComponent/Owner-banner.jsx";
import { PlusCircle } from "lucide-react";
import DealShowCard from "../../../Components/DealCard.jsx";
import Loading from "../../../Components/Shared/Loading/Loading";

const OwnerDeals = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allDeals, loading, error } = useSelector((state) => ({
    allDeals: state.deals.allDeals,
    loading: state.deals.loading.all,
    error: state.deals.error.all,
  }));

  useEffect(() => {
    console.log("Dispatching fetchAllDeals");
    dispatch(fetchAllDeals());
  }, [dispatch]);

  useEffect(() => {
    console.log("Current state:", { allDeals, loading, error });
  }, [allDeals, loading, error]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(fetchAllDeals());
  };

  // Function to validate deal data
  const isValidDeal = (deal) => {
    return (
      deal &&
      deal.BusinessName &&
      deal.Description &&
      typeof deal.OfferMoney !== "undefined" &&
      typeof deal.OfferDeal !== "undefined"
    );
  };

  // Function to format deal data
  const formatDealData = (deal) => {
    return {
      ownerImage: deal.BusinessOwnerPictureUrl || deal.BusinessOwnerImage || "",
      ownerName: deal.BusinessOwnerName || "Unknown Owner",
      ownerId: deal.BusinessOwnerId || deal.OwnerId,
      businessName: deal.BusinessName,
      category: deal.CategoryName || "Uncategorized",
      description: deal.Description,
      offerMoney: `${deal.OfferMoney || 0} EGP`,
      offerDeal: `${deal.OfferDeal || 0}%`,
      productImages: deal.Pictures || [],
      dealId: deal.DealId || deal.Id,
    };
  };

  return (
    <>
      <Navbar currentTab={"Deals"} />
      <HomeBanner />
      <OwnerBanner />

      <div className="container">
        <div className="bg-gray-100 p-6 rounded-lg mx-auto max-w-[1600px] min-h-screen flex flex-col items-start mt-6 mb-10 px-10">
          {/* Button adding deal */}
          <div className="w-full flex justify-center mb-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-white justify-between bg-[#3E3BCC] rounded-lg p-4 w-full"
            >
              <span className="font-medium text-xl">Publish New Deal</span>
              <PlusCircle className="text-white w-10 h-10" />
            </button>
            {isModalOpen && (
              <DealPublishCard
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </div>

          <h1 className="text-2xl font-semibold text-left mb-4">
            All Published Deals
          </h1>

          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loading />
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 bg-red-50 rounded">
                <p>Error loading deals: {error.message || error}</p>
                <button
                  onClick={() => dispatch(fetchAllDeals())}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : !allDeals ||
              !Array.isArray(allDeals) ||
              allDeals.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No deals found.</p>
                {!Array.isArray(allDeals) && (
                  <p className="text-sm text-red-500 mt-2">
                    Invalid data format received from server
                  </p>
                )}
              </div>
            ) : (
              <div>
                {allDeals.map((deal, index) => {
                  if (!isValidDeal(deal)) {
                    console.error("Invalid deal data:", deal);
                    return null;
                  }

                  const formattedDeal = formatDealData(deal);

                  return (
                    <div key={formattedDeal.dealId || index} className="mb-8">
                      <DealShowCard deal={formattedDeal} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-20"></div>
      <Footer />
    </>
  );
};

export default OwnerDeals;
