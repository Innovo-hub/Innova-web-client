//show all data of another component^^
import ProfileDetails from "./Profiles-Data/ProfileDetails";
import ProfileHeader from "./Profiles-Data/ProfileHeader";
import ProfileImage from "../../assets/Profiles/Profile1.png";
import CoverImage from "../../assets/Profiles/wallpaper.png";
import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Swal from "sweetalert2";
import HomeBanner from "../../Components/Home-Banner";
import CopyRights from "../../Components/Copy-Rights";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
//data that will chage with endpoint in Api
function UserProfile() {
  const userData = {
    FirstName: "Mohamed",
    LastName: "Ali",
    id: "233366959",
    Email: "Nader_Hani@gmail.com",
    PhoneNumber: "+(20)1234567891",
    City: "Cairo, Egypt",
    District: "El-Shorouk 1, area 15, 85",
    Role: "Business Owner", // Role as login_Acount
    Verified: true,
    profileImageUrl: ProfileImage,
    coverImageUrl: CoverImage,
  };
const handleLogout = async () => {
    // Show loading indicator using SweetAlert2
    Swal.fire({
      title: "Logging out...",
      text: "Please wait while we log you out",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mt-8">
          {" "}
          {/* Added mt-8 to push content down */}
          {/* Sidebar that have links and his icons^^ */}
          <aside className="w-full md:w-64 p-4 mb-4 md:mb-0">
            <nav className="space-y-4">
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <PermIdentityIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Personal Information
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <VerifiedUserOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Privacy & Security
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <LocalAtmOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Payment Methods
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <TrendingUpIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Current Deals
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <LocalMallOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Orders
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-red-500"
                onClick={handleLogout}
              >
                <LogoutRoundedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Log Out
              </a>
            </nav>
          </aside>
          {/* Main Content that show content of profileHeader and ProfileDetail */}
          <main className="flex-1 md:ml-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ProfileHeader user={userData} />
              <ProfileDetails user={userData} />
            </div>

            {/* Dashboard */}
            <div className="mt-6 w-full pl-0 ml-0">
              <h2 className="text-2xl font-semibold text-left">
                Your Business Analysis Dashboard
              </h2>
              <p className="text-gray-500 mt-2">
                [Placeholder for AI dashboard]
              </p>
            </div>
          </main>
        </div>
      </div>
      <Footer />
      <CopyRights />
    </div>
  );
}

export default UserProfile;
