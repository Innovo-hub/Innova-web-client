import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import ActivateAccount from "./Pages/Auth/ActivateAccount";
import ForgetPassword from "./Pages/Auth/ForgetPassword";

function App() {
  return (
    <>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        {/* Auth Routes */}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/activate-account" element={<ActivateAccount />} />
      </Routes>
    </>
  );
}

export default App;
