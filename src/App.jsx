import { Route, Routes } from "react-router-dom";
import "./App.css";
import GoogleCallback from "./Pages/Auth/Auth-Components/GoogleCallback";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Home from "./Pages/Home/Home";
 

function App() {
  return (
       

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword/>} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
       

  );
}

export default App;
