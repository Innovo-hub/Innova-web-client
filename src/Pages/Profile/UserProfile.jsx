import { Card, CardContent } from "./Profile-Components/Card";
import { ProfileHeader } from "./Profile-Components/ProfileHeader";
import { ProfileDetails } from "./Profile-Components/ProfileDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import APILINK from "../../../Constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import './Profile-Components/UserProfile.css';
function UserProfile() {
  const [userData, setUserData] = useState({});
  const token = useSelector((state) => state.login.token);

  const getUserData = async (token) => {
    try {
      const response = await axios.get(`${APILINK}/api/Profile/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50" id="main-profile-page">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div>
          <Link to={"/"} className="text-white my-2">
            <NavigateBeforeIcon /> Back to Home page
          </Link>
        </div>
        <Card>
          <ProfileHeader user={userData} />
          <CardContent>
            <ProfileDetails user={userData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserProfile;
