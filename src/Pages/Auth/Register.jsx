import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import APILINK from "../../../Constants";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import rejs1 from "../../assets/AuthAssets/rejs1.jpeg";
import SignupImage from "../../assets/AuthAssets/SignupImage.png";
import customer from "../../assets/AuthAssets/customer.png";
import businessOwner from "../../assets/AuthAssets/businessOwner.svg";
import Investor from "../../assets/AuthAssets/Investor.svg";
import { RegisterUser } from "../../redux/Slices/Auth-Slice/RegisterReducer";
import RolesDropdown from "./Auth-Components/RolesDropdown";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    district: "",
    phoneNumber: "",
    country: "",
    roleId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (roleId) => {
    console.log("Selected Role ID:", roleId); // Debugging
    setFormData({
      ...formData,
      roleId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const result = await dispatch(RegisterUser(formData)).unwrap(); // Use unwrap() to get the payload or error.

      Swal.fire({
        icon: "success",
        title: "User Registered Successfully",
        text: "Redirecting to activation page...",
        timer: 3000,
        showConfirmButton: false,
      });

      navigate("/auth/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  // const authwithGoogle = async () => {
  //   try {
  //     await dispatch(RgisterWithGoogle());
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Google Login Failed",
  //       text: error.message || "Unable to authenticate with Google.",
  //     });
  //   }
  // };

  return (
    <>
      <Navbar currentTab={"Auth"} />
      {/* Screen 1 of Register  */}
      <div className="bg-gradient-to-t from-white to-amber-800 py-10">
        <div className="container">
          <div className="reg-screen1 bg-white w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-10">
              <div className="flex justify-center flex-col p-8">
                <h3 className="text-2xl text-gray-500">
                  hello there 👋🏻, Welcome to
                </h3>
                <h1 className="font-bold text-5xl py-4 lg:text-7xl bg-gradient-to-r from-[#000000cc] to-[#BA5A16] bg-clip-text text-transparent">
                  Innova HUB
                </h1>
                <p className="text-xl text-gray-400">
                  A platform that cares about e-commerce, investment, publishing
                  your business, putting your ideas, and exploring products!
                </p>
                <div className="mt-16">
                  <a
                    href="#form"
                    className="mt-6 a-screen1-rej text-xl border-2  py-2 px-12 rounded-2xl text-[#BA5A16] border-[#BA5A16] hover:bg-[#BA5A16] hover:text-white"
                  >
                    Join Us Now!
                  </a>
                </div>
              </div>
              <div>
                <img src={rejs1} className=" rounded-3xl" alt="register photo"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* screen 2 of register Form */}
      <div className="mt-20">
        <div className="container">
          <div>
            <h2 className="text-6xl font-bold bg-gradient-to-br from-[#000000cc] to-[#BA5A16] bg-clip-text text-transparent mb-5 text-center">
              OUR ROLES
            </h2>
            <p className="lg:text-2xl text-lg px-3 text-center ">
              Our platform has three contributors and you can be one of them!
            </p>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-3 py-20 space-y-3 text-center">
            <div className="reg-card-screen2 p-10 flex flex-col justify-center items-center w-[97%]  ">
              <div className="card-image w-full">
                <img src={customer} alt="Customer" />
              </div>
              <div className="card-content mt-10">
                <h4 className="text-2xl font-semibold my-2">Customer</h4>
                <p className="text-gray-600">
                  You can Explore handmade products or projects and view the
                  environment of products and offers in a large scale, making
                  your journey excited and by products widely and faster.
                </p>
              </div>
            </div>
            <div className="reg-card-screen2 p-10 flex flex-col justify-between w-[97%] ">
              <div className="card-image w-full">
                <img src={businessOwner} alt="businessOwner" />
              </div>
              <div className="card-content mt-10">
                <h4 className="text-2xl font-semibold my-2">Business Owner</h4>
                <p className="text-gray-600">
                  You can publish your own projects and create an environment
                  for interaction with them on a large scale, making your
                  project spread more widely and faster.
                </p>
              </div>
            </div>
            <div className="reg-card-screen2 p-10 flex flex-col justify-between  w-[97%]">
              <div className="card-image w-full">
                <img src={Investor} alt="businessOwner" />
              </div>
              <div className="card-content mt-10">
                <h4 className="text-2xl font-semibold my-2">Investor</h4>
                <p className="text-gray-600">
                  You can invest on projects and create an environment for
                  investment easily with business owners in a large scale,
                  making your investment spread more widely and faster
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* screen 3 of register Form */}
      <div className="container mt-20">
        <div>
          <h2 className="text-6xl font-bold bg-gradient-to-br from-[#000000cc] to-[#BA5A16] bg-clip-text text-transparent mb-5 text-center">
            SIGN UP NOW!
          </h2>
          <p className="text-2xl text-center">
            Start Your Journey Now with Innova HUB
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex justify-center items-center p-3">
            <img
              src={SignupImage}
              alt="Register"
              className="object-cover w-75 h-75 rounded-lg"
            />
          </div>
          <div
            className=" flex justify-center items-center bg-white p-4 lg:p-6"
            id="form"
          >
            <div className="w-full max-w-md">
              <div className="mb-5">
                <p className="text-gray-500 mt-2">Enter your Information</p>
              </div>
              <form
                className="space-y-4 flex flex-col justify-center"
                onSubmit={handleSubmit}
              >
                {/* Customize Component  */}
                <div className="flex justify-between">
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  LabelText="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  LabelText="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Input
                  LabelText="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div className="flex justify-between">
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                  <Input
                    sx={{ width: "47%" }}
                    LabelText="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <RolesDropdown
                  roleId={formData.roleId}
                  onChange={handleRoleChange}
                />
                <h6>
                  Already have an account?{" "}
                  <span className="text-[#BA5A16]">
                    <Link to={"/auth/login"}>Log in</Link>
                  </span>
                </h6>
                <div className="text-center">
                  <MainButton
                    className="bg-[#BA5A16] text-white rounded-md w-44 p-3"
                    ButtonText={loading ? "Loading..." : "Create Account"}
                    disabled={loading}
                    type="submit"
                  />
                  {error && <p className="text-red-500">{error.data}</p>}
                </div>
              </form>
              <div className="flex flex-col justify-center items-center mt-4">
                <p>or Sign up with</p>
                <div className="social-icons flex space-x-2">
                  <a
                    href={`${APILINK}/api/Account/google-login`}
                    target="_blank"
                  >
                    <GoogleIcon sx={{ color: "#BA5A16" }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
