import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import APILINK from "../../../Constants";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import SignInImage from "../../assets/AuthAssets/SignInImage.jpg";
import { loginUser } from "../../redux/Slices/Auth-Slice/LoginReducer";
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
          loader.style.borderColor = "#DB4444"; // Spinner border color
          loader.style.borderTopColor = "transparent"; // Spinner top border color
        }
      },
    });
    try {
      const formData = { email, password };
      console.log("FormData ", formData);

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
      navigate("/free-dashboard");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar currentTab={"Auth"} />
      <div className="bg-gradient-to-t from-white to-[#BA5A16] py-10">
        <div className="container">
          <div className="login-screen bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* left side form */}
              <div className="flex justify-center items-center bg-white p-4 lg:p-6 rounded-3xl">
                <div className="w-full max-w-md">
                  <div className="mb-5 ">
                    <h2 className="font-bold text-4xl my-5 bg-gradient-to-r from-[#000000cc] to-[#BA5A16] bg-clip-text text-transparent">
                      Welcome Again
                    </h2>
                    <p className="text-gray-500 mt-2">Sign in your account </p>
                  </div>
                  <form
                    className="space-y-4 flex flex-col justify-center items-center"
                    onSubmit={handleSubmit}
                  >
                    {/* Input is a customized Component by Me "Nader ": " */}
                    <Input
                      LabelText="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      LabelText="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <h6>
                      don&apos;t have an account ?{" "}
                      <span className="text-[#BA5A16]">
                        <Link to={"/auth/register"}>Sign up</Link>
                      </span>
                    </h6>
                    <div className="">
                      <Link
                        to={"/auth/forget-password"}
                        className="text-[#DB4444]"
                      >
                        forgot Password?
                      </Link>
                    </div>
                    <MainButton
                      className="bg-[#BA5A16] text-white rounded-md p-3 w-44"
                      ButtonText={loading ? "loging you in..." : "Login"}
                    />
                    {error && (
                      <p className="text-red-500">
                        {error.message || "Invalid email or password"}
                      </p>
                    )}
                    <p>or login with</p>
                    {/* fi 2 icons henah facebook and google */}
                    <div className="social-icons flex space-x-2">
                      <a
                        href={`${APILINK}/api/Account/google-login`}
                        target="_blank"
                      >
                        <GoogleIcon sx={{ color: "#BA5A16" }} />
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              {/* right side image sign in */}
              <div className="hidden lg:flex justify-center items-center  p-3">
                <img
                  src={SignInImage}
                  alt="Login"
                  className="object-cover w-100 h-100 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
