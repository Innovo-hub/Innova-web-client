import Navbar from "../../Components/Navbar";
import { useState } from "react";
import Input from "../../Components/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MainButton from "../../Components/Button";
import SignUpImage from "../../assets/AuthAssets/SignupImage.png";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.registerslice);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    district: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
  };

  return (
    <>
    {/* custom Navbar and takes the current Tab to hide the buttons  */}
      <Navbar currentTab={"Auth"} /> 

      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="flex justify-center items-center p-3">
          <img
            src={SignUpImage}
            alt="Register"
            className="object-cover w-75 h-75 rounded-lg"
          />
        </div>

        <div className="flex justify-center items-center bg-white p-4 lg:p-6">
          <div className="w-full max-w-md">
            <div className="mb-5">
              <h2 className="font-bold text-2xl mt-2">Welcome to Innova App</h2>
              <p className="text-gray-500 mt-2">Start your journey now!</p>
            </div>
            <form
              className="space-y-4 flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              {/* Custom component ctrl+Right Click to view  */}
              <Input
                LabelText="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                LabelText="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                LabelText="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                LabelText="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
              <Input
                LabelText="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="business_owner">Business Owner</MenuItem>
                  <MenuItem value="investor">Investor</MenuItem>
                </Select>
              </FormControl>

              <MainButton
                className="bg-[#DB4444] text-white rounded-md w-44 p-3"
                ButtonText={loading ? "Loading..." : "Create Account"}
                disabled={loading}
                type="submit"
              />
              {error && <p className="text-red-500">{error.data.message}</p>}
              <p>or Sign up with</p>
              <div className="social-icons flex space-x-2">
                <GoogleIcon sx={{ color: "#DB4444" }} />
                <FacebookOutlinedIcon sx={{ color: "#DB4444" }} />
              </div>
              <h6>
                Already have an account?{" "}
                <span className="text-[#DB4444]">
                  <Link to={"/auth/login"}>Log in</Link>
                </span>
              </h6>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
