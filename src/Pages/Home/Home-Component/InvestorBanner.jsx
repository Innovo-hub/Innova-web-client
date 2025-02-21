import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function InvestorBanner() {
  return (
    <div className="relative w-full my-8 px-4 lg:px-16">
      {/* Header Section */}
      <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* User Info Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {/* User Name and Details */}
            <div className="flex space-x-2 justify-center items-center">
              <div>
                <img src={user} width={60} alt="User" />
              </div>
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-lg font-bold">Nader_Hani</h1>
                <p className="text-sm text-blue-600">
                  <CheckCircleIcon fontSize="small" /> Verified
                </p>
              </div>
            </div>
            {/* Divider */}
            <div className="w-px h-8 bg-gray-400"></div>
            {/* Investor ID details */}
            <div>
              <p className="text-sm ">Investor ID</p>
              <p className="text-sm text-gray-500">2233666951</p>
            </div>
          </div>
        </div>
        {/* Profile and Settings Section */}
        <div className="flex gap-6 justify-end">
          <Link
            className="flex items-center justify-center text-gray-600"
            to={`/UserProfile`}
          >
            <PersonOutlineOutlinedIcon /> Profile
          </Link>
          <button className="flex items-center justify-center text-gray-600">
            <SettingsOutlinedIcon />
            Settings
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="rounded-lg w-full mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-[#f0f0f3] p-6 rounded-lg flex justify-between items-start">
          <div className="flex flex-col w-full md:w-3/4">
            <p className="text-black text-base mb-2">Estimated Balance</p>
            <h2 className="text-xl font-bold" style={{ color: "#2C1DB3" }}>
              152,326.33 EGP
            </h2>
            <p className="text-black text-sm mt-2">≈ $3,025.20</p>
          </div>
          <div className="flex flex-col gap-4 mt-4 md:mt-0 md:ml-8 justify-end">
            <button
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#0056B3" }}
            >
              Withdraw
            </button>
            <button
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#0056B3" }}
            >
              Deposit
            </button>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="bg-[#f0f0f3] p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="flex items-center justify-center rounded-full">
            <img src={Dashboard} alt="Dashboard" className="h-16 w-16" />
          </div>
          <Link to="/UserProfile" className="mt-2 text-black">
            <span style={{ color: "#126090" }}>Go</span> To Dashboard {">"}
          </Link>
        </div>
      </div>
      {/* Latest Product Overview(table) */}
      <h3 className="text-2xl my-4">Current Investment Projects</h3>
      <div className="bg-[#f0f0f3] p-4  rounded-lg w-full   overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-2 text-left text-[#126090] text-base">
                Product Name
              </th>
              <th className="p-2 text-left text-[#126090] text-base">
                Total Earnings
              </th>
              <th className="p-2 align-middle text-[#126090] text-base">%</th>
              <th className="p-2 text-center text-[#126090] text-base">
                Deal Value
              </th>
              <th className="p-2 text-center text-[#126090] text-base">
                Owner Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
            <tr>
              <td className="p-2 text-base">Pop one Store</td>
              <td className="p-2 text-base">152,236.33 EGP</td>
              <td className="p-2 text-green-600 text-lg text-center">
                +16.65%
              </td>
              <td className="p-2 text-center text-base">
                10% of total Earnings
              </td>
              <td className="p-2 text-center text-base">Mohamed Ali</td>
              <td className="p-2 text-center text-base">✉</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ends */}
      <h3 className="text-2xl mb-4 text-center mt-8">
        Feel Free To Discover our platform Products and Deals Projects!{" "}
      </h3>
    </div>
  );
}

export default InvestorBanner;
