import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import profile1 from "../../../assets/Deals/Profile1.png";
function OwnerBanner() {
  return (
    <div className="container">
      <div className="relative w-full my-8 px-4 lg:px-16">
        {/* Header Section */}
        <div className=" rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {/* User Info Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {/* User Name and Details */}
              <div className="flex space-x-2 justify-center items-center">
                <div>
                  <img src={profile1} width={60} alt="User" />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-lg font-semibold">Mohamed Ali</h1>
                  <p className="text-sm text-blue-600">
                    <CheckCircleIcon fontSize="small" /> Verified
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="w-px h-8 bg-gray-400"></div>
              {/* Business Owner details */}
              <div>
                <p className="text-lg font-semibold">Business Owner ID</p>
                <p className="text-sm text-gray-500">2233666951</p>
              </div>
            </div>
          </div>
          {/* Profile and Settings Section */}
          <div className="flex gap-6 justify-end">
            <Link className="flex items-center justify-center text-gray-600">
              <PersonOutlineOutlinedIcon /> Profile
            </Link>
            <button className="flex items-center justify-center text-gray-600">
              <SettingsOutlinedIcon />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerBanner;
