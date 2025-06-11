import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";
import { useEffect, useState } from "react";
import PublishProduct from "./Publish-Product";
import { PlusCircle } from "lucide-react";
import PublishProductCard from "./Publish-Product";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/Slices/User-Slice/UserProfile";

function BussinessBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  if (loading || !profile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }
  if (error){
    return <div>Error loading profile</div>
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
                  {profile.RoleId}
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
          <a href="#" className="mt-4 text-lg font-medium">
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
          Latest Product Overview
        </h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Product ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#126090]">
                    Total Earnings
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    %
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    Total Views
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#126090]">
                    Number of Selling
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    Pop one Store
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    552986765
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    152,236.33 EGP
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      +16.65%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    23
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    8
                  </td>
                </tr>
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
