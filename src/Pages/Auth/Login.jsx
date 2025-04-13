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

      <div className="sm:bg-login w-full py-10 min-h-screen">
        <div className="login-screen bg-white w-[90%] m-auto lg:w-[25%] pb-12 ">
          <div className="grid grid-cols-1">
            {/* left side form */}
            <div className="flex justify-center items-center bg-white p-4 lg:p-6 rounded-3xl">
              <div className="w-full max-w-md">
                <div className="mb-5 ">
                  <h2 className="font-bold text-4xl my-12 text-center">
                    <span className="text-[#126090]">I</span>nnova
                  </h2>
                  <div className="text-center my-6">
                    <a
                      className=" bg-[#ff3a28] font-medium py-1 px-8 rounded-lg"
                      href={`${APILINK}/api/Account/google-login`}
                      target="_blank"
                    >
                      <GoogleIcon sx={{ color: "#ffff" }} />
                      <span className="text-white ms-2">
                        Sign in with google
                      </span>
                    </a>
                  </div>
                  <p className="text-gray-500 mt-2 text-center">
                    or with Email{" "}
                  </p>
                </div>
                <form
                  className="space-y-4 flex flex-col justify-center items-center "
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

                  <div className="text-left w-full">
                    <Link
                      to={"/auth/forget-password"}
                      className="text-[#DB4444]"
                    >
                      forgot Password?
                    </Link>
                  </div>
                  <MainButton
                    className="bg-[#126090] text-white rounded-md p-3 w-64"
                    ButtonText={loading ? "loging you in..." : "Sign In"}
                  />
                  {error && (
                    <p className="text-red-500">
                      {error.message || "Invalid email or password"}
                    </p>
                  )}
                  <h6>
                    <Link to={"/auth/register"}>
                      Don&apos;t have an account ?
                    </Link>
                  </h6>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CopyRights />
    </>
  );
}

export default Login;
