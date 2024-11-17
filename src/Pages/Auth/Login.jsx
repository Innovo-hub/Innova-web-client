import { Link } from "react-router-dom";
import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import SignInImage from "../../assets/AuthAssets/SignInImage.jpg";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
function Login() {
  return (
    <>
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* left side form */}
        <div className="flex justify-center items-center bg-white p-4 lg:p-6">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <h2 className="font-bold text-4xl mt-2">Log In</h2>
              <p className="text-gray-500 mt-2">Sign in your account </p>
            </div>
            <form className="space-y-4 flex flex-col justify-center items-center">
              {/* Input is a customized Component by Me "Nader ": " */}
              <Input LabelText="Email" type="email" />
              <Input LabelText="Password" type="password" />
              <div className="">
                <Link className="text-[#DB4444]">forgot Password?</Link>
              </div>
              <MainButton
                className="bg-[#DB4444] text-white rounded-md p-3 w-44"
                ButtonText={"Login"}
              />
              <p>or login with</p>
              {/* fi 2 icons henah facebook and google */}
              <div className="social-icons flex space-x-2">
                <GoogleIcon sx={{ color: "#DB4444" }} />
                <FacebookOutlinedIcon sx={{ color: "#DB4444" }} />
              </div>
              <h6>
                don&apos;t have an account ?{" "}
                <span className="text-[#DB4444]">
                  <Link to={"/auth/register"}>Sign up</Link>
                </span>
              </h6>
            </form>
          </div>
        </div>
        {/* right side image sign in */}
        <div className="flex justify-center items-center  p-3">
          <img
            src={SignInImage}
            alt="Login"
            className="object-cover w-100 h-100 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
