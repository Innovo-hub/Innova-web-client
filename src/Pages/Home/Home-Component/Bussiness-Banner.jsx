import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import PublishProductCard from "./Publish-Product";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/Slices/User-Slice/UserProfile";
import { fetchOwnerDeals } from "../../../redux/Slices/Deals-Slice/DealsReducer";
import Loading from "../../../Components/Shared/Loading/Loading";

function BussinessBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Get profile data
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state) => state.profile);

  // Get deals data with proper null checks
  const dealsState = useSelector((state) => state.deals);
  const ownerDeals = dealsState?.ownerDeals || [];
  const dealsLoading = dealsState?.loading?.owner || false;
  const dealsError = dealsState?.error?.owner || null;

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchOwnerDeals());
  }, [dispatch]);

  if (profileLoading || dealsLoading) {
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    );
  }

  if (profileError || dealsError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading data:{" "}
        {profileError?.message || dealsError?.message || "Unknown error"}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10 text-gray-500">
        No profile data available
      </div>
    );
  }

  return (
    <div className="relative w-full my-12 px-4 lg:px-16">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              {/* User Name and Details */}
              <div className="flex space-x-4 items-center">
                <div className="relative">
                  <img
                    src={profile.ProfileImageUrl || user}
                    width={70}
                    height={70}
                    alt="User"
                    className="rounded-full border-2 border-blue-500 p-1 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-gray-800">
                    {profile.FirstName} {profile.LastName}
                  </h1>
                  <p
                    className={
                      profile.IsVerified
                        ? "text-sm text-blue-600 flex items-center gap-1"
                        : "hidden"
                    }
                  >
                    <CheckCircleIcon
                      fontSize="small"
                      className="text-blue-500"
                    />
                    <span className="font-medium">Verified Account</span>
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="h-12 w-px bg-gray-300"></div>
              {/* Business Owner details */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  Business Owner ID
                </p>
                <p className="text-lg font-bold text-blue-600">
                  {profile.Id}
                </p>
              </div>
            </div>
          </div>
          {/* Profile and Settings Section */}
          <div className="flex gap-6 justify-end items-center">
            <Link
              to="/userProfile"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <PersonOutlineOutlinedIcon />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Card 1 - Balance */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col w-full">
            <p className="text-gray-600 text-lg mb-3">Estimated Balance</p>
            <h2 className="text-3xl font-bold text-[#2C1DB3] mb-2">
              {profile.TotalBalance} EGP
            </h2>
            <p className="text-gray-500 text-base">
              ≈ ${profile.TotalBalance / 50}
            </p>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="bg-white shadow-lg p-8 rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group">
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            <img src={Dashboard} alt="Dashboard" className="h-20 w-20" />
          </div>
          <a href="/UserProfile" className="mt-4 text-lg font-medium">
            <span className="text-[#126090]">Go</span> To Dashboard
            <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* Publish New Product */}
        <div className="w-full">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">Publish New Product</span>
              <PlusCircle className="w-8 h-8 transform group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </button>

          {isModalOpen && (
            <PublishProductCard
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Latest Deals Overview
        </h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Project Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Owner Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Product ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Total Profit
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    OfferDeal %
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    Duration In
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ownerDeals && ownerDeals.length > 0 ? (
                  ownerDeals.map((deal) => (
                    <tr
                      key={deal.DealId}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {deal.ProjectName}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {deal.OwnerName || "null"}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {deal.DealId}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {deal.TotalProfit}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          +{deal.OfferDeal.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {deal.Status}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {deal.DurationInMonths}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No deals available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 text-center mt-12 mb-8">
        Exploring Others Products
      </h3>
    </div>
  );
}

export default BussinessBanner;
