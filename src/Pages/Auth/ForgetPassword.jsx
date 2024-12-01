import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import ForgetPasswordImage from "../../assets/AuthAssets/ForgetPassword.png";
function ForgetPassword() {
  return (
    <>
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* left side form */}
        <div className="flex justify-center items-center bg-white p-4 lg:p-6">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <h2 className="font-bold text-4xl mt-2">Forget Password</h2>
              <p className="text-gray-500 mt-2">
                Please enter your email to reset the password
              </p>
            </div>
            <form className="space-y-4 flex flex-col justify-center items-center">
              {/* Input is a customized Component by Me "Nader ": " */}
              <Input LabelText="Email" type="email" />
              <MainButton
                className="bg-[#BA5A16] text-white rounded-md p-3 w-44"
                ButtonText={"Submit"}
              />
              <h6 className="space-x-2">
                Remember your password ? 
                <span className="text-[#BA5A16]">
                  <Link to={"/auth/login"}>Log in</Link>
                </span>
              </h6>
            </form>
          </div>
        </div>
        {/* right side image sign in */}
        <div className="flex justify-center items-center  p-3">
          <img
            src={ForgetPasswordImage}
            alt="Login"
            className="object-cover w-100 h-100 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
