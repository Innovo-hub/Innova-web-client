import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import ForgetPasswordImage from "../../assets/AuthAssets/ForgetPassword.png";
import { motion } from "framer-motion";

function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/reset-password");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)] gap-8 px-4 py-8 lg:px-12">
        {/* Left side form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center"
        >
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-8 text-center">
              <h2 className="font-bold text-4xl text-gray-800 mb-3">
                Forgot Password?
              </h2>
              <p className="text-gray-600 text-lg">
                No worries! Enter your email and we'll send you reset
                instructions.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleConfirmPassword}>
              <div className="space-y-4">
                <Input
                  LabelText="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-[#BA5A16] transition-all duration-200"
                />
              </div>
              <MainButton
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-[#126090] hover:bg-[#126099] transform hover:scale-[1.02]"
                  }`}
                ButtonText={
                  loading ? "Sending Verification Code..." : "Reset Password"
                }
                disabled={loading}
              />
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link
                    to="/auth/login"
                    className="text-[#126090] font-semibold hover:text-[#126099] transition-colors duration-200"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex justify-center items-center"
        >
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-transparent rounded-2xl" />
            <img
              src={ForgetPasswordImage}
              alt="Forgot Password Illustration"
              className="object-cover w-full h-full rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgetPassword;
