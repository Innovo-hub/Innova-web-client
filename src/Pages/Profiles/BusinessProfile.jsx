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

import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./Profile-Components/Profile-Sidebar";
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
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <HomeBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mt-8">
          <ProfileSidebar />
          {/* Main Content that show content of profileHeader and ProfileDetail */}
          <main className="flex-1 md:ml-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ProfileHeader user={userData} />
              <ProfileDetails user={userData} />
            </div>

            {/* Dashboard */}
            <div className="my-6 w-full">
              <h2 className="text-2xl font-semibold text-left">
                Your Business Analysis Dashboard
              </h2>
              {/* <p className="text-gray-500 mt-2">
                [Placeholder for AI dashboard]
              </p> */}
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
