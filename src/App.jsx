import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Home from "./Pages/Home/Home";
import UserProfile from "./Pages/Profile/UserProfile";
import Category from "./Pages/CategorySearch/Category";

function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/category/:name" element={<Category />} />
      {/* Auth Routes */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forget-password" element={<ForgetPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/user-profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
