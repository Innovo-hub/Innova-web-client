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
<<<<<<< HEAD
import Orders from "./Pages/Orders/Orders";
import RetuenOrder from "./Pages/Orders/ReturnOrder"
import WriteReview from "./Pages/Orders/WriteReview"

=======
import Privacy from "./Pages/Profiles/Profile-Components/privecy";
import ContactPage from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
>>>>>>> 153ec1e125bb3aeb0ee84245a917ded694baf7b0

function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<About />} />
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
      <Route path="/UserProfile/privacy" element={<Privacy />} />
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
      {/*Your orders*/}
      <Route path="/order" element={<Orders />} />
      <Route path="/return_order" element={<RetuenOrder />} />
      <Route path="/write_review" element={<WriteReview />} />


    </Routes>
  );
}

export default App;
