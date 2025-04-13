import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileDetails from "./Profiles-Data/ProfileDetails";
import ProfileHeader from "./Profiles-Data/ProfileHeader";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import HomeBanner from "../../Components/Home-Banner";
import CopyRights from "../../Components/Copy-Rights";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import APILINK from "../../../Constants"; // Ensure this has your API base URL
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/Slices/Auth-Slice/LoginReducer";
import WishlistOrders from "./Profile-Components/whislist";

function UserProfile() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError({ message: "User is not authenticated!" });
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${APILINK}/api/Profile/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Profile Data:", response.data); // Debug API response
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data || { message: "Failed to fetch profile" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <p className="text-center mt-10 text-blue-500">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error.message}</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-gray-500">No profile data found.</p>;
  }

  console.log("User Profile Data:", profile);

  return (
    <div>
      <Navbar />
      <HomeBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="flex flex-col md:flex-row mt-8">
          {/* Sidebar */}
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

              {profile?.RoleName === "BusinessOwner" ||
              profile?.RoleName === "Investor" ? (
                <a
                  href="#"
                  className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                  <QueryStatsIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                  Current Deals
                </a>
              ) : null}
              {profile?.RoleName === "BusinessOwner" ? (
                <a
                  href="#"
                  className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                  <InventoryIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                  My Orders
                </a>
              ) : null}

              <a
                href="#"
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <LocalAtmOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Payment Methods
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 font-semibold hover:text-red-500"
              >
                <LogoutRoundedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Log Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 md:ml-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ProfileHeader user={profile} />
              <ProfileDetails user={profile} />
            </div>

            {/* Dashboard */}
            {profile &&
              (profile.RoleName === "BusinessOwner" ||
                profile.RoleName === "Investor") && (
                <div className="mt-6 w-full pl-0 ml-0">
                  <h2 className="text-2xl font-semibold text-left">
                    Your Business Analysis Dashboard
                  </h2>
                  <div className="text-center my-6">
                    <iframe
                      title="Sales_Analysis"
                      width="1140"
                      height="541.25"
                      src="https://app.powerbi.com/reportEmbed?reportId=cc90a135-cfb5-4d64-8094-31f63623136c&autoAuth=true&ctid=ae362704-0450-46f2-ab02-2b0a1df6406d"
                      frameBorder="0"
                      allowFullScreen="true"
                    ></iframe>
                  </div>
                </div>
              )}
            {profile.RoleName === "Customer" && <WishlistOrders />}
          </main>
        </div>
      </div>

      <Footer />
      <CopyRights />
    </div>
  );
}

export default UserProfile;
