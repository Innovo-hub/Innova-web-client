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

const OwnerDeals = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allDeals, status, error } = useSelector((state) => state.deals);
  useEffect(() => {
    dispatch(fetchAllDeals());
  }, [dispatch]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(fetchAllDeals());
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
              className="flex items-center justify-between bg-white rounded-lg p-4 w-full"
            >
              <span className="text-gray-700 font-medium text-xl">
                Publish New Product
              </span>
              <PlusCircle className="text-[#126090] w-10 h-10" />
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
            {status === "loading" ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg">Loading deals...</p>
              </div>
            ) : status === "failed" ? (
              <div className="text-red-500 p-4 bg-red-50 rounded">
                <p>Error loading deals: {error}</p>
              </div>
            ) : allDeals.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No deals found.</p>
              </div>
            ) : (
              allDeals.map((deal, index) => (
                <div key={deal.id || index} className="mb-8">
                  <DealShowCard
                    deal={{
                      ownerImage: deal.BusinessOwnerPictureUrl || "",
                      ownerName: deal.BusinessOwnerName,
                      ownerId: deal.BusinessOwnerId,
                      businessName: deal.BusinessName,
                      category: deal.CategoryName,
                      description: deal.Description,
                      offerMoney: `${deal.OfferMoney} EGP`,
                      offerDeal: `${deal.OfferDeal}%`,
                      productImages: deal.Pictures || [],
                    }}
                  />
                </div>
              ))
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
