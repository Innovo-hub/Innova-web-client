//to make header of profile that have (ProfileImage+ name)
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Profile1 from '../../../assets/Profiles/Profile1.png';
import wallpaper from '../../../assets/Profiles/wallpaper.png';
function ProfileHeader({ user }) {
  console.log("ProfileHeader received:", user); // Add this for debugging

  return (
    <div className="relative w-full">
      {/* Cover image   */}
      <div
        className="w-full h-auto md:h-64 bg-cover bg-center relative"
        // style={{ backgroundImage: `url(${user.ProfileCoverUrl})` }}
      >
        <img
          src={user.ProfileCoverUrl || wallpaper}
          alt=""
          className="w-full h-[300px] md:h-64 bg-cover bg-center"
        />
        {/*icon updating in cover_image*/}
        <div className="absolute bottom-2 right-2 bg-[#F7F7F7E5] p-2 rounded-full cursor-pointer hover:bg-[#e0e0e0]">
          <DriveFileRenameOutlineIcon className="text-[#126090] w-2.5 h-2.5" />
        </div>
      </div>

      <div className="relative px-4 md:px-6 pb-0 bg-[#F7F7F7] ">
        <div className="absolute -top-16 left-4 md:left-6">
          {/*Image_profile^^*/}
          <img
            src={user.ProfileImageUrl || Profile1}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 shadow-lg rounded-xl"
          />
          {/* icon updating in image_profile */}
          <div className="absolute bottom-0 left-0 bg-[#F7F7F7] p-0.5 rounded-full  cursor-pointer hover:bg-[#e0e0e0]">
            <DriveFileRenameOutlineIcon className="text-[#126090] w-1 h-1" />
          </div>
        </div>
        {/*section header(name , |, iD , verified)*/}

        <div className="pt-8 md:pt-12 pb-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h1 className="text-2xl font-bold">
                {user.FirstName} {user.LastName}
              </h1>
              <div className="h-8 border-l-2 border-gray-400 mx-2"></div>
              <div className="flex items-center">
                <span className="text-[#126090] text-lg">ID:</span>
                <span className="text-[#4B4A4A] text-lg ml-1">
                  {user.RoleId}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {/* Verified */}
              {user.RoleName && (
                <div className="flex items-center gap-2 text-[#126090]">
                  <CheckCircleIcon
                    fontSize="small"
                    className="text-[#0000FF]"
                  />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;






















