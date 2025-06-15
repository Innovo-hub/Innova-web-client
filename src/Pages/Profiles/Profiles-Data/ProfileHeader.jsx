/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Profile1 from "../../../assets/Profiles/Profile1.png";
import wallpaper from "../../../assets/Profiles/wallpaper.png";
import axios from "axios";
import APILINK from "../../../../Constants";

function ProfileHeader({ user }) {
  const [profileImage, setProfileImage] = useState(
    user.ProfileImageUrl || Profile1
  );
  const [coverImage, setCoverImage] = useState(
    user.ProfileCoverUrl || wallpaper
  );

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleFileChange = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (type === "profile") {
        setProfileImage(previewUrl);
        await axios.post(`${APILINK}/api/Profile/profile-picture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      } else {
        setCoverImage(previewUrl);
        await axios.post(`${APILINK}/api/Profile/profile-cover`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="w-full h-[250px] md:h-[300px] bg-cover bg-center relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Edit Cover */}
        <div
          className="absolute bottom-4 right-4 bg-white/80 p-3 rounded-full cursor-pointer hover:bg-white/90 transition-all duration-200 shadow-md"
          onClick={() => coverInputRef.current.click()}
        >
          <DriveFileRenameOutlineIcon className="text-[#126090] w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            ref={coverInputRef}
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "cover")}
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 md:px-6 pb-0 bg-[#F7F7F7]">
        <div className="absolute -top-20 left-4 md:left-6">
          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 md:w-32 md:h-32 shadow-lg rounded-xl object-cover"
          />
          {/* Edit Profile */}
          <div
            className="absolute bottom-0 left-0 bg-[#F7F7F7] p-0.5 rounded-full cursor-pointer hover:bg-[#e0e0e0]"
            onClick={() => profileInputRef.current.click()}
          >
            <DriveFileRenameOutlineIcon className="text-[#126090] w-1 h-1" />
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, "profile")}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-8 md:pt-12  pb-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 py-5">
              <h1 className="text-2xl font-bold">
                {user.FirstName} {user.LastName}
              </h1>
              <div className="h-8 border-l-2 border-gray-400 mx-2"></div>
              <div className="flex items-center">
                <span className="text-[#126090] text-lg">ID:</span>
                <span className="text-[#4B4A4A] text-lg ml-1">
                  {user.Id}
                </span>
              </div>
            </div>

            {(user.RoleName === "BusinessOwner" ||
              user.RoleName === "Investor") &&
              (user.IsVerified ? (
                <div className="flex items-center gap-2 text-[#126090]">
                  <CheckCircleIcon
                    fontSize="small"
                    className="text-[#0000FF]"
                  />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#757575]">
                  <CheckCircleIcon
                    fontSize="small"
                    className="text-[#757575]"
                  />
                  <span>Unverified</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
