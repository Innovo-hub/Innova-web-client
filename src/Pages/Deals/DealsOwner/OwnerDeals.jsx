import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealsByOwner } from "../../../redux/Slices/Deals-Slice/DealsReducer.jsx"; 
import CopyRights from "../../../Components/Copy-Rights.jsx";
import DealCardInvestor from "../../../Components/DealCard-investor.jsx";
import DealPublishCard from "../../../Components/publishDealCard.jsx";
import Footer from "../../../Components/Footer.jsx";
import HomeBanner from "../../../Components/Home-Banner.jsx";
import Navbar from "../../../Components/Navbar.jsx";
import OwnerBanner from "./DealsComponent/Owner-banner.jsx";
import { PlusCircle } from "lucide-react";

const OwnerDeals = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ← استبدل بالـ ownerId الحقيقي
  const ownerId = "27460e81-c17a-476f-b0b5-c8f1a78e6fe5";

  const { ownerDeals, status } = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDealsByOwner(ownerId));
  }, [dispatch]);

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
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>

          <h1 className="text-2xl font-semibold text-left mb-4">
            Recent Published Deals
          </h1>

          <div className="w-full">
            {status === "loading" ? (
              <p>Loading deals...</p>
            ) : ownerDeals.length === 0 ? (
              <p>No deals found.</p>
            ) : (
              ownerDeals.map((deal, index) => (
                <div key={index} className="mb-8">
                  <DealCardInvestor
                    deal={{
                      ownerImage: "", // مفيش صورة owner في البيانات غالبًا
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
      <CopyRights />
    </>
  );
};

export default OwnerDeals;
