import { Route, Routes } from "react-router-dom";
import "./App.css";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Home from "./Pages/Home/Home";
import Category from "./Pages/CategorySearch/Category";
import NormalUserProfile from "./Pages/Profiles/NormalUserProfile";
import ProductDetails from "./Pages/Product/ProductDetails";
import Checkout from "./Pages/payments/Checkout/Checkout";
import Payment from "./Pages/payments/Payment/Payment";
import Cart from "./Pages/payments/cart/Cart";
import WishList from "./Pages/WishList/WishList";
import PaymentSuccess from "./Pages/payments/PaymentSuccess/PaymentSuccess";
import InvestmentContractForm from "./Pages/Contract/contract";
import InvestorDeals from "./Pages/Deals/DealsInvestor/InvestorDeals";
import OwnerDeals from "./Pages/Deals/DealsOwner/OwnerDeals";

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
      <Route path="/investor/Deals" element={<InvestorDeals />} />
      <Route path="/owner/Deals" element={<OwnerDeals />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      {/* <Route path="/UserProfile" element={<BusinessProfile />} />
      <Route path="/UserProfile" element={<InvestorProfile />} /> */}
      <Route path="/UserProfile" element={<NormalUserProfile />} />
      <Route
        path="/InvestmentContractForm"
        element={<InvestmentContractForm />}
      />
      {/* payment and Cart Routes*/}
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
}

export default App;
