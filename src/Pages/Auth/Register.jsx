import Navbar from "../../Components/Navbar";
import { useState } from "react";
import Input from "../../Components/Input";
import MainButton from "../../Components/Button";
import SignUpImage from "../../assets/AuthAssets/SignupImage.png";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/Slices/Auth-Slice/RegisterReducer";
import RolesDropdown from "./Auth-Components/RolesDropdown";
import Swal from "sweetalert2";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.register);
  const  navigate  = useNavigate();
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
  
      navigate("/auth/activate-account");
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
            {/* Customize Component  */}
              <Input
                LabelText="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                LabelText="Last Name"
                name="lastName"
                value={formData.lastName}
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
                LabelText="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Input
                LabelText="Country"
                name="country"
                value={formData.country}
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
              <RolesDropdown
                roleId={formData.roleId}
                onChange={handleRoleChange}
              />

              <MainButton
                className="bg-[#DB4444] text-white rounded-md w-44 p-3"
                ButtonText={loading ? "Loading..." : "Create Account"}
                disabled={loading}
                type="submit"
              />
              {error && <p className="text-red-500">{error.data}</p>}
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
