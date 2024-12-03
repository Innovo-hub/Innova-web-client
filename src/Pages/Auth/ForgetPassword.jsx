import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import ForgetPasswordImage from "../../assets/AuthAssets/ForgetPassword.png";

function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirmPassword = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setTimeout(() => {
      setLoading(false); // Reset loading state
      navigate("/auth/reset-password"); // Navigate to the reset-password page
    }, 2000); // Wait for 2 seconds
  };

  return (
    <>
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left side form */}
        <div className="flex justify-center items-center bg-white p-4 lg:p-6">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <h2 className="font-bold text-4xl mt-2">Forget Password</h2>
              <p className="text-gray-500 mt-2">
                Please enter your email to reset the password
              </p>
            </div>
            <form
              className="space-y-4 flex flex-col justify-center items-center"
              onSubmit={handleConfirmPassword} // Use onSubmit handler
            >
              <Input LabelText="Email" type="email" />
              <MainButton
                className="bg-[#BA5A16] text-white rounded-md p-3 w-44"
                ButtonText={loading ? "Loading..." : "Submit"} // Show loading text
                disabled={loading} // Disable button during loading
              />
              <h6 className="space-x-2">
                Remember your password?
                <span className="text-[#BA5A16]">
                  <Link to={"/auth/login"}>Log in</Link>
                </span>
              </h6>
            </form>
          </div>
        </div>
        {/* Right side image */}
        <div className="flex justify-center items-center p-3">
          <img
            src={ForgetPasswordImage}
            alt="Login"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
