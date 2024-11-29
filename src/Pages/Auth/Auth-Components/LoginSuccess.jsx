import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/Slices/Auth-Slice/Google-authReducer"; // Your Redux action to set user

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const email = params.get("email");
    const roleName = params.get("roleName");
    const token = params.get("token");

    if (userId && email && token) {
      // Dispatch user data to Redux store
      dispatch(setUser({ userId, email, roleName, token }));

      // Redirect to home or dashboard
      navigate("/");
    } else {
      // Handle missing parameters
      console.error("Missing parameters in OAuth response");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div>Processing login...</div>;
};

export default LoginSuccess;
