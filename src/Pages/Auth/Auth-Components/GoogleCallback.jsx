import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import APILINK from "../../../../Constants";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      const error = queryParams.get("error");

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error,
        });
        navigate("/auth/register");
        return;
      }

      if (code) {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(`${APILINK}/api/Account/google-callback`, { code });
          Swal.fire({
            icon: "success",
            title: "Google Login Successful",
            text: "Welcome back!",
          });
          navigate("/dashboard"); // Redirect to your app's main page
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: err.response?.data?.message || "Something went wrong.",
          });
        }
      }
    };

    handleGoogleAuth();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
