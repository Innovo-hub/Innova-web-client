import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";
import { useState } from "react";
import PublishProduct from "./Publish-Product";
import { PlusCircle } from "lucide-react";
import PublishProductCard from "./Publish-Product";

function BussinessBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                <div className="rounded-full overflow-hidden shadow-md">
                  <img
                    src={user}
                    width={70}
                    height={70}
                    alt="User"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-xl font-bold text-gray-800">
                    Mohamed Ali
                  </h1>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircleIcon
                      fontSize="small"
                      className="text-blue-500"
                    />
                    <span className="font-medium">Verified</span>
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="w-px h-12 bg-gray-200"></div>
              {/* Business Owner details */}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Business Owner ID
                </p>
                <p className="text-sm text-gray-500 font-mono">2233666951</p>
              </div>
            </div>
          </div>
          {/* Profile and Settings Section */}
          <div className="flex gap-6 justify-end">
            <Link className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">
              <PersonOutlineOutlinedIcon />
              <span className="font-medium">Profile</span>
            </Link>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50">
              <SettingsOutlinedIcon />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 - Estimated Balance */}
        <div className="bg-white shadow-lg p-8 rounded-xl hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col w-full">
            <p className="text-gray-600 text-base mb-3">Estimated Balance</p>
            <h2 className="text-3xl font-bold text-[#2C1DB3] mb-2">0 EGP</h2>
            <p className="text-gray-500 text-sm">≈ $0</p>
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
            className="w-full bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
          >
            <span className="text-gray-700 font-semibold text-xl">
              Publish New Product
            </span>
            <PlusCircle className="text-[#126090] w-10 h-10 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {isModalOpen && (
            <PublishProductCard
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>

        {/* Total Views */}
        <div className="bg-white shadow-lg p-8 rounded-xl hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-700 text-xl font-semibold">Total Views</h3>
            <p className="text-2xl font-bold text-[#0056B3]">23</p>
          </div>
        </div>
      </div>

      {/* Latest Product Overview(table) */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">Latest Product Overview</h3>
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 text-left text-[#126090] font-semibold">
                  Product Name
                </th>
                <th className="p-4 text-left text-[#126090] font-semibold">
                  Product ID
                </th>
                <th className="p-4 text-left text-[#126090] font-semibold">
                  Total Earnings
                </th>
                <th className="p-4 text-center text-[#126090] font-semibold">
                  %
                </th>
                <th className="p-4 text-center text-[#126090] font-semibold">
                  Total Views
                </th>
                <th className="p-4 text-center text-[#126090] font-semibold">
                  Number of Selling
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-4 text-gray-700">Pop one Store</td>
                <td className="p-4 font-mono text-gray-600">552986765</td>
                <td className="p-4 font-semibold text-gray-800">
                  152,236.33 EGP
                </td>
                <td className="p-4 text-green-600 font-semibold text-center">
                  +16.65%
                </td>
                <td className="p-4 text-center text-gray-700">23</td>
                <td className="p-4 text-center text-gray-700">8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Exploring Others Products */}
      <h3 className="text-2xl font-semibold text-center mt-12 mb-8">
        Exploring Others Products
      </h3>
    </div>
  );
}

export default BussinessBanner;
