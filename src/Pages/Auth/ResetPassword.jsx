import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import ResetPasswordImage from "../../assets/AuthAssets/ResetPassword.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-8 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="font-bold text-3xl text-gray-800 mb-3">
                Set a new password
              </h2>
              <p className="text-gray-600">
                Create a new password. Ensure it differs from previous ones for
                security.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <Input
                  LabelText="Verification Code"
                  type="text"
                  className="w-full"
                />
                <Input
                  LabelText="New Password"
                  type="password"
                  className="w-full"
                />
                <Input
                  LabelText="Confirm Password"
                  type="password"
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <MainButton
                  className="w-full bg-[#126090] hover:bg-[#126090] transition-colors duration-300 text-white rounded-lg py-3.5 px-6 font-medium text-sm"
                  ButtonText={loading ? "Updating..." : "Update Password"}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full max-w-2xl">
            <img
              src={ResetPasswordImage}
              alt="Reset Password Illustration"
              className="object-contain w-full h-auto rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
