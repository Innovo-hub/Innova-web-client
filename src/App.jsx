import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Home from "./Pages/Home/Home";
//import UserProfile from "./Pages/Profile/UserProfile";//Mahmoued^^
import Category from "./Pages/CategorySearch/Category";
import InvestorDeals from "./Pages/DealsInvestor/InvestorDeals";  
import OwnerDeals from "./Pages/DealsOwner/OwnerDeals";
import BusinessProfile from "./Pages/Profiles/BusinessProfile"; 
import InvestorProfile from "./Pages/Profiles/InvestorProfile"; 
import NormalUserProfile from "./Pages/Profiles/NormalUserProfile"; 

 function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      {/* Auth Routes */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forget-password" element={<ForgetPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      {/*<Route path="/user-profile" element={<UserProfile />} /> */}
      <Route path="/investor/deals" element={<InvestorDeals />} />
      <Route path="/owner/deals" element={<OwnerDeals />} />
      <Route path="/UserProfile" element={<BusinessProfile />} />
      <Route path="/UserProfile" element={<InvestorProfile />} />
      <Route path="/UserProfile" element={<NormalUserProfile />} />
    </Routes>
  );
}

export default App;
