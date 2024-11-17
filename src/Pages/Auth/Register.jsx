import Navbar from "../../Components/Navbar";
import { useState } from "react";
import Input from "../../Components/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MainButton from "../../Components/Button";
import SignUpImage from "../../assets/AuthAssets/SignupImage.png";
function Register() {
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Navbar currentTab={"Register"} />
      <h2 className="font-bold text-2xl text-center mt-2">
        Start your journey with us now !
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left side for Image */}

        <div className="flex justify-center items-center  p-3">
          <img
            src={SignUpImage}
            alt="Register"
            className="object-cover w-75 h-75 rounded-lg"
          />
        </div>

        {/* Right side for Form */}
        <div className="flex justify-center items-center bg-white p-4 lg:p-6">
          <div className="w-full max-w-md">
            <form className="space-y-4 flex flex-col justify-center items-center">
              {/* Input is a customized Component by Me "JM31" */}
              <Input LabelText="Name" />
              <Input LabelText="Email" type="email" />
              <Input LabelText="City" />
              <Input LabelText="District" />
              <Input LabelText="Password" type="password" />

              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  label="Role"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="business_owner">Business Owner</MenuItem>
                  <MenuItem value="investor">Investor</MenuItem>
                </Select>
              </FormControl>

              <MainButton
                className="bg-[#DB4444] text-white rounded-md p-4"
                ButtonText={"Create Account"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
