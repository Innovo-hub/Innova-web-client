 import MainButton from "../../Components/Button";
import Input from "../../Components/Input";
import Navbar from "../../Components/Navbar";
import ResetPasswordImage from "../../assets/AuthAssets/ResetPassword.png";

function ResetPassword() {
  return (
    <>
      <Navbar currentTab={"Auth"} />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        { }
        <div className="flex justify-center items-center bg-white p-6">
          <div className="w-full max-w-md">
            {/* this part of title page(ResetPassword)^^ */}
            <div className="mb-8">
              <h2 className="font-bold text-3xl">Set a new password</h2>
              <p className="text-gray-600 mt-3">
                Create a new password. Ensure it differs from previous ones for security.
              </p>
            </div>

            {/* Updata password in this form that send DB*/}
            <form className="space-y-6">
              {/* FirstLabel*/}
              <Input LabelText="Update Password" type="password" />
              {/* SecondLabel  confirm*/}
              <Input LabelText="Confirm Password" type="password" />
              {/*  Button to updataPassword  */}
              <div className="flex justify-center">
                <MainButton
                  className="bg-[#DB4444] text-white rounded-md py-3 px-6"
                  ButtonText={"Update Password"}
                />
              </div>
            </form>
          </div>
        </div>

        {/* image resetPassword */}
        <div className="flex justify-center items-center p-6">
          <img
            src={ResetPasswordImage}
            alt="Reset Password Illustration"
            className="object-contain max-w-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
  
