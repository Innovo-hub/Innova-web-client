import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import profile1 from "../../../../assets/Deals/profile1.png";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import NotificationPanel from "../../Notification/Notfication";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../../redux/Slices/User-Slice/UserProfile";

function OwnerBanner() {
  const [openNotify, setOpenNotify] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
 const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  if (loading || !profile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }
  if (error){
    return <div>Error loading profile</div>
  }
  return (
    <div className="container">
      <div className="relative w-full my-6 px-4 lg:px-12">
        {/* Simple Professional Banner */}
        <div className="bg-white border-b border-gray-200 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center p-5">
            {/* Profile Section */}
            <div className="flex items-center space-x-5 mb-4 md:mb-0">
              {/* Profile Image */}
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={profile.ProfileImageUrl || profile1}
                  className="h-full w-full object-cover"
                  alt="Mohamed Ali"
                />
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center">
                  <h1 className="text-lg font-medium text-gray-800">
                    {profile.FirstName} {" "} {profile.LastName}
                  </h1>
                  <div className="ml-2 text-blue-500">
                    <CheckCircleIcon style={{ fontSize: 18 }} />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Business Owner ID:{" "}
                  <span className="font-mono">{profile.RoleId}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div>
              <button
                onClick={() => setOpenNotify(!openNotify)}
                className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Badge
                  badgeContent={notificationCount}
                  color="primary"
                  size="small"
                >
                  <NotificationsNoneOutlinedIcon
                    className="text-gray-600"
                    fontSize="small"
                  />
                </Badge>
                <span className="text-gray-700 text-sm">Notifications</span>
              </button>

              <NotificationPanel
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                setNotificationCount={setNotificationCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerBanner;
