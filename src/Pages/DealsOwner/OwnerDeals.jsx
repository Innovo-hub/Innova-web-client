import CopyRights from "../../Components/Copy-Rights";
import DealCard from "../../Components/DealCard";
import Footer from "../../Components/Footer";
import HomeBanner from "../../Components/Home-Banner";
import Navbar from "../../Components/Navbar";
import profile1 from "../../assets/Deals/profile1.png";
import profile2 from "../../assets/Deals/profile2.png";
import profile3 from "../../assets/Deals/profile3.png";
import image1 from "../../assets/Deals/image1.png";
import image2 from "../../assets/Deals/image2.png";
import image3 from "../../assets/Deals/image3.png";
import image4 from "../../assets/Deals/image4.png";
import image5 from "../../assets/Deals/image5.png";
import image6 from "../../assets/Deals/image6.png";
import image7 from "../../assets/Deals/image7.png";
import image8 from "../../assets/Deals/image8.png";
import image9 from "../../assets/Deals/image9.png";
import OwnerBanner from "./DealsComponent/Owner-banner.jsx"
import DealPublishCard from "../../Components/publishDealCard";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import DealCardInvestor from "../../Components/DealCard-investor.jsx";

const dealsData = [
  {
    ownerImage: profile1,
    ownerName: "Mohamed Ali",
    ownerId: "2333669591",
    businessName: "Aqua-Candels",
    category: "Home accessories",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    offerMoney: "10,000 EGP",
    offerDeal: "20% of total project",
    productImages: [image1, image2, image3],
  },
  {
    ownerImage: profile2,
    ownerName: "Ahmed Amr",
    ownerId: "2678669591",
    businessName: "Handmade Crafts",
    category: "Handicrafts",
    description: "Unique handmade crafts designed with care and creativity.",
    offerMoney: "15,000 EGP",
    offerDeal: "30% of total project",
    productImages: [image4, image5, image6],
  },
  {
    ownerImage: profile3,
    ownerName: "Asmaa Ragab",
    ownerId: "2333669591",
    businessName: "Caty-life",
    category: "Pet Accessories",
    description: "Luxury pet accessories for your lovely cats and dogs.",
    offerMoney: "60,000 EGP",
    offerDeal: "45% of total project",
    productImages: [image7, image8, image9],
  },
];

const OwnerDeals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar currentTab={"Deals"}/>
      <HomeBanner />
      <OwnerBanner />
      <div className="container"></div>
      {/* container of 3 card |_|*/}
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

            {/* Modal Component */}
            {isModalOpen && (
              <DealPublishCard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
          {/* text of container */}
          <h1 className="text-2xl font-semibold text-left mb-4">
            Recent Published Deals
          </h1>
          {/*   3cards on container and, map to appear 3*/}
          <div className="w-full">
            {dealsData.map((deal, index) => (
              <div key={index} className="mb-8">
                <DealCardInvestor deal={deal} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* add margin between cards*/}
      <div className="mb-20"></div>
      <Footer />
      <CopyRights />
    </>
  );
};
export default OwnerDeals;
