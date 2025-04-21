import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";

function InvestorBanner() {
  return (
    <div className="relative w-full my-12 px-4 lg:px-16">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
        {/* User Info Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            {/* User Name and Details */}
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <img
                  src={user}
                  width={70}
                  alt="User"
                  className="rounded-full border-2 border-blue-500 p-1"
                />
                <span className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-800">Nader_Hani</h1>
                <p className="text-sm text-blue-600 flex items-center gap-1">
                  <CheckCircleIcon fontSize="small" className="text-blue-500" />
                  <span className="font-medium">Verified Account</span>
                </p>
              </div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-gray-300"></div>
            {/* Investor ID details */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Investor ID</p>
              <p className="text-lg font-bold text-blue-600">2233666951</p>
            </div>
          </div>
        </div>
        {/* Profile and Settings Section */}
        <div className="flex gap-6 justify-end items-center">
          <Link
            to="/UserProfile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700"
          >
            <PersonOutlineOutlinedIcon />
            <span className="font-medium">Profile</span>
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700">
            <SettingsOutlinedIcon />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Card 1 - Balance */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col w-full">
            <p className="text-gray-600 text-lg mb-3">Estimated Balance</p>
            <h2 className="text-3xl font-bold text-indigo-700 mb-2">
              152,326.33 EGP
            </h2>
            <p className="text-gray-500 text-base">≈ $3,025.20</p>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col items-center justify-center">
            <img
              src={Dashboard}
              alt="Dashboard"
              className="h-20 w-20 mb-4 transform hover:scale-110 transition-transform duration-300"
            />
            <Link
              to="/UserProfile"
              className="text-lg font-medium hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-blue-600">Go</span> To Dashboard →
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Product Overview(table) */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Current Investment Projects
        </h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Total Earnings
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    %
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Deal Value
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Owner Name
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    Pop one Store
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    152,236.33 EGP
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      +16.65%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    10% of total Earnings
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    Mohamed Ali
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                    ✉
                  </td>
                </tr>
                {/* Repeat the same row structure for other entries */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ends */}
      <h3 className="text-2xl font-bold text-gray-800 text-center mt-12 mb-8">
        Feel Free To Discover our Platform Products and Deals Projects!
      </h3>
    </div>
  );
}

export default InvestorBanner;
