import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import APILINK from "../../../Constants";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import rejs1 from "../../assets/AuthAssets/rejs1.svg";
import SignupImage from "../../assets/AuthAssets/SignupImage.svg";
import customer from "../../assets/AuthAssets/customer.svg";
import businessOwner from "../../assets/AuthAssets/businessOwner.svg";
import Investor from "../../assets/AuthAssets/Investor.svg";
import { RegisterUser } from "../../redux/Slices/Auth-Slice/RegisterReducer";
import RolesDropdown from "./Auth-Components/RolesDropdown";
import CopyRights from "../../Components/Copy-Rights";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpperCase && hasSpecialChar && isLongEnough;
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

    if (!validatePassword(formData.password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long.",
      });
      return;
    }

    try {
      const result = await dispatch(RegisterUser(formData)).unwrap(); // Use unwrap() to get the payload or error.
      navigate("/auth/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <Navbar currentTab={"Auth"} />
      {/* Enhanced Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f8fafc] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-[#19376D]/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-[#576CBC]/5 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen py-12 md:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Content */}
            <motion.div
              className="text-gray-800 space-y-6 md:space-y-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="space-y-4">
                <motion.span
                  className="inline-block px-4 md:px-6 py-2 bg-[#19376D]/5 backdrop-blur-lg rounded-full text-sm font-medium border border-[#19376D]/10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  👋🏻 Welcome to the Future of E-commerce
                </motion.span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
                  Innova
                  <span className="bg-gradient-to-r from-[#19376D] to-[#576CBC] bg-clip-text text-transparent">
                    {" "}
                    HUB
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Discover a revolutionary platform that brings together
                  e-commerce, investment opportunities, and business innovation.
                  Your gateway to endless possibilities in the digital
                  marketplace.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#form"
                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-[#19376D] text-white rounded-full text-base md:text-lg font-semibold hover:bg-[#0B2447] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Now
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.a>
                <motion.a
                  href="#features"
                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 border-2 border-[#19376D]/30 text-[#19376D] rounded-full text-base md:text-lg font-semibold hover:bg-[#19376D]/5 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>

              <div className="pt-8">
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-full border-2 border-[#19376D] bg-white flex items-center justify-center text-[#19376D] font-bold shadow-lg`}
                      >
                        {i}K+
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Trusted by thousands of users <br />
                    worldwide
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative z-10">
                <img
                  src={rejs1}
                  className="w-full h-auto rounded-2xl transform hover:scale-105 transition-all duration-500"
                  alt="Innova Hub Platform"
                />
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Trusted Platform
                      </p>
                      <p className="text-xs text-gray-500">
                        Verified by experts
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#19376D] rounded-full flex items-center justify-center text-white">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Fast Growth
                      </p>
                      <p className="text-xs text-gray-500">
                        Join & grow with us
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Services Section with White Background */}
      <motion.div
        className="py-20 bg-white relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <div className="absolute top-40 left-20 w-72 h-72 bg-[#19376D]/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#576CBC]/5 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container relative">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-[#19376D] mb-6">
              Our Services & Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing deals, support handmade crafts, and connect with
              a community of creators and investors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="h-12 md:h-16 w-12 md:w-16 bg-[#19376D]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 md:w-8 h-6 md:h-8 text-[#19376D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2v5a2 2 0 11-2 2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#19376D]">
                Exclusive Deals
              </h3>
              <p className="text-gray-600">
                Access special offers and discounts on handmade products from
                our verified sellers.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="h-12 md:h-16 w-12 md:w-16 bg-[#19376D]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 md:w-8 h-6 md:h-8 text-[#19376D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#19376D]">
                Handmade Crafts
              </h3>
              <p className="text-gray-600">
                Support local artisans and discover unique, handcrafted products
                made with passion.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="h-12 md:h-16 w-12 md:w-16 bg-[#19376D]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-6 md:w-8 h-6 md:h-8 text-[#19376D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#19376D]">
                Community
              </h3>
              <p className="text-gray-600">
                Join a thriving community of creators, investors, and customers
                sharing common interests.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Roles Section with White Background */}
      <motion.div
        className="py-20 bg-white relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-40 left-20 w-72 h-72 bg-[#19376D]/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#576CBC]/5 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container relative">
          <motion.div variants={fadeInUp}>
            <h2 className="text-6xl font-bold text-[#19376D] text-center mb-5">
              OUR ROLES
            </h2>
            <p className="lg:text-2xl text-lg px-3 text-center text-gray-600 mb-16">
              Our platform has three contributors and you can be one of them!
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="card-image w-full mb-8">
                <img
                  src={customer}
                  alt="Customer"
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="card-content text-center">
                <h4 className="text-2xl font-semibold mb-4 text-[#19376D]">
                  Customer
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Explore handmade products or projects and view the environment
                  of products and offers in a large scale, making your journey
                  excited and by products widely and faster.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="card-image w-full mb-8">
                <img
                  src={businessOwner}
                  alt="Business Owner"
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="card-content text-center">
                <h4 className="text-2xl font-semibold mb-4 text-[#19376D]">
                  Business Owner
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Publish your own projects and create an environment for
                  interaction with them on a large scale, making your project
                  spread more widely and faster.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              variants={fadeInUp}
            >
              <div className="card-image w-full mb-8">
                <img
                  src={Investor}
                  alt="Investor"
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="card-content text-center">
                <h4 className="text-2xl font-semibold mb-4 text-[#19376D]">
                  Investor
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Invest on projects and create an environment for investment
                  easily with business owners in a large scale, making your
                  investment spread more widely and faster.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Registration Form Section with White Background */}
      <motion.div
        className="py-20 bg-gradient-to-br from-white to-[#f8fafc] relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-40 right-20 w-72 h-72 bg-[#19376D]/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-[#576CBC]/5 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container relative">
          <motion.div variants={fadeInUp}>
            <h2 className="text-6xl font-bold text-[#19376D] text-center mb-5">
              SIGN UP NOW!
            </h2>
            <p className="text-2xl text-center text-gray-600 mb-16">
              Start Your Journey Now with Innova HUB
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div className="hidden lg:block" variants={fadeInUp}>
              <img
                src={SignupImage}
                alt="Register"
                className="w-full h-auto rounded-2xl transform hover:scale-105 transition-all duration-500"
              />
            </motion.div>

            <motion.div
              className="w-full max-w-2xl mx-auto lg:max-w-none p-4 md:p-8 bg-white rounded-2xl shadow-xl"
              variants={fadeInUp}
              id="form"
            >
              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold text-[#19376D] mb-2">
                  Create Your Account
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Enter your information to get started
                </p>
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <Input
                    LabelText="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    LabelText="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <Input
                  LabelText="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    LabelText="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    LabelText="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    LabelText="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    LabelText="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    LabelText="District"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full"
                  />
                  <Input
                    LabelText="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <RolesDropdown
                  roleId={formData.roleId}
                  onChange={handleRoleChange}
                  className="w-full"
                />

                <div className="flex flex-col items-center space-y-4">
                  <MainButton
                    className="w-full max-w-md bg-[#19376D] text-white rounded-full py-4 px-8 text-lg font-semibold hover:bg-[#0B2447] transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    ButtonText={
                      loading ? "Creating Account..." : "Create Account"
                    }
                    disabled={loading}
                    type="submit"
                  />

                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/auth/login"
                      className="text-[#19376D] hover:text-[#0B2447] font-semibold transition-colors duration-300"
                    >
                      Log in
                    </Link>
                  </p>

                  {error && (
                    <p className="text-red-500 text-center">{error.data}</p>
                  )}
                </div>
              </form>

              <div className="mt-6 md:mt-8 text-center">
                <p className="text-gray-600 mb-4">or Sign up with</p>
                <motion.a
                  href={`${APILINK}/api/Account/google-login`}
                  className="inline-flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-full px-4 md:px-6 py-2 md:py-3 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GoogleIcon className="text-[#19376D]" />
                  <span className="text-sm md:text-base text-gray-700">
                    Continue with Google
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <CopyRights />
    </>
  );
}

export default Register;
