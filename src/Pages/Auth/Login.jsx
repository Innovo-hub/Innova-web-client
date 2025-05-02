import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import APILINK from "../../../Constants";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import { loginUser } from "../../redux/Slices/Auth-Slice/LoginReducer";
import CopyRights from "../../Components/Copy-Rights";
import { motion } from "framer-motion";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Display loading indicator using SweetAlert2
    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we process your login",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
        const loader = document.querySelector(".swal2-loader");
        if (loader) {
          loader.style.borderColor = "#126090"; // Spinner border color
          loader.style.borderTopColor = "transparent"; // Spinner top border color
        }
      },
    });
    try {
      const formData = { email, password };

      const result = await dispatch(loginUser(formData)).unwrap();

      if (result) {
        Swal.close(); // Close the loading modal
        navigate("/"); // Navigate after successful login
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Invalid email or password",
      });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar currentTab={"Auth"} />

      <div className="sm:bg-login w-full py-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-screen bg-white w-[90%] m-auto lg:w-[30%] pb-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm"
        >
          <div className="grid grid-cols-1">
            <div className="flex justify-center items-center bg-white p-6 lg:p-8 rounded-3xl">
              <div className="w-full max-w-md">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="font-bold text-4xl my-8 text-center tracking-tight">
                    <span className="text-[#126090]">I</span>nnova
                  </h2>
                  <div className="text-center my-8">
                    <a
                      className="inline-flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium py-2.5 px-8 rounded-lg shadow-sm"
                      href={`${APILINK}/api/Account/google-login`}
                      target="_blank"
                    >
                      <GoogleIcon sx={{ color: "#DB4437" }} />
                      <span className="text-gray-700 ms-3 font-semibold">
                        Sign in with Google
                      </span>
                    </a>
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        or continue with email
                      </span>
                    </div>
                  </div>
                </motion.div>
                <form
                  className="space-y-5 flex flex-col justify-center items-center"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full space-y-5">
                    <Input
                      LabelText="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-[#126090]"
                    />
                    <Input
                      LabelText="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-[#126090]"
                    />
                  </div>

                  <div className="text-left w-full">
                    <Link
                      to={"/auth/forget-password"}
                      className="text-[#126090] hover:text-[#0e4c73] transition-colors duration-200 text-sm font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <MainButton
                    className="bg-[#126090] hover:bg-[#0e4c73] text-white rounded-lg py-3 px-6 w-full transition-all duration-200 font-medium text-base shadow-sm hover:shadow-md"
                    ButtonText={loading ? "Signing in..." : "Sign In"}
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {error.message || "Invalid email or password"}
                    </motion.p>
                  )}

                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to={"/auth/register"}
                      className="text-[#126090] hover:text-[#0e4c73] font-medium transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <CopyRights />
    </>
  );
}

export default Login;
