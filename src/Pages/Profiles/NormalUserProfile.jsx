import { useEffect, useState } from "react";
import axios from "axios";
import ProfileDetails from "./Profiles-Data/ProfileDetails";
import ProfileHeader from "./Profiles-Data/ProfileHeader";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import HomeBanner from "../../Components/Home-Banner";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import APILINK from "../../../Constants"; // Ensure this has your API base URL
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/Slices/Auth-Slice/LoginReducer";
import WishlistOrders from "./Profile-Components/whislist";
import Loading from "../../Components/Shared/Loading/Loading";
import Predict from "./Profile-Components/predict";
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
        // console.log("Profile Data:", response.data); // Debug API response
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <dev className="flex justify-center items-center my-8">
        <Loading />
      </dev>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  if (!profile) {
    return (
      <p className="text-center mt-10 text-gray-500">No profile data found.</p>
    );
  }
  // console.log("User Profile Data:", profile);
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <div className="  px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="flex flex-col md:flex-row mt-8">
          {/* Sidebar */}
          <aside className="w-full  p-2 mb-4 md:mb-0">
            <nav className="space-y-4">
              <Link
                to={"/UserProfile"}
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <PermIdentityIcon className="text-[#126090]  h-3.5 mr-3" />
                Personal Information
              </Link>
              <Link
                to={"/UserProfile/privacy"}
                className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
              >
                <VerifiedUserOutlinedIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                Privacy & Security
              </Link>

              {profile?.RoleName === "BusinessOwner" ||
              profile?.RoleName === "Investor" ? (
                <Link
                  to={"/UserProfile/deals"}
                  className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                  <QueryStatsIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                  Current Deals
                </Link>
              ) : null}
              {profile?.RoleName === "BusinessOwner" ? (
                <a
                  href="/UserProfile/orders"
                  className="flex items-center text-gray-700 font-semibold hover:text-blue-600"
                >
                  <InventoryIcon className="text-[#126090] w-3.5 h-3.5 mr-3" />
                  My Orders
                </a>
              ) : null}

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
          <main className="">
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
                      width="1120"
                      height="541.25"
                      src="https://app.powerbi.com/reportEmbed?reportId=cc90a135-cfb5-4d64-8094-31f63623136c&autoAuth=true&ctid=ae362704-0450-46f2-ab02-2b0a1df6406d"
                      frameBorder="0"
                      allowFullScreen="true"
                    ></iframe>
                  </div>
                </div>
              )}
            {profile.RoleName === "BusinessOwner" && (
              <Predict />
            )}
            {profile.RoleName === "Customer" && <WishlistOrders />}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserProfile;
