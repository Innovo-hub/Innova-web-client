import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DealShowCard from "../../../Components/DealCard.jsx";
import Footer from "../../../Components/Footer.jsx";
import HomeBanner from "../../../Components/Home-Banner.jsx";
import Navbar from "../../../Components/Navbar.jsx";
import { fetchAllDeals } from "../../../redux/Slices/Deals-Slice/DealsReducer.jsx";
import InvDealsBanner from "./Deals-Component/InvDealsBanner.jsx";
const OwnerDeals = () => {
  const dispatch = useDispatch();

  // Select allDeals instead of ownerDeals since we want to show all deals
  const { allDeals, status, error } = useSelector((state) => state.deals);

  useEffect(() => {
    // Fetch all deals without an owner ID parameter
    dispatch(fetchAllDeals());
  }, [dispatch]);

 

  return (
    <>
      <Navbar currentTab={"Deals"} />
      <HomeBanner />
      <InvDealsBanner />

      <div className="container">
        <div className="bg-gray-100 p-6 rounded-lg mx-auto max-w-[1600px] min-h-screen flex flex-col items-start mt-6 mb-10 px-10">
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
                      ownerImage: deal.BusinessOwnerImage,
                      ownerName: deal.BusinessOwnerName,
                      ownerId: deal.BusinessOwnerId,
                      businessName: deal.BusinessName,
                      category: deal.CategoryName,
                      description: deal.Description,
                      offerMoney: `${deal.OfferMoney} EGP`,
                      offerDeal: `${deal.OfferDeal}%`,
                      productImages: deal.Pictures || [],
                      dealId: deal.DealId,
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
