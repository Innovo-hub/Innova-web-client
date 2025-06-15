import { Route, Routes, Navigate } from "react-router-dom";
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
import InvestorDeals from "./Pages/Deals/DealsInvestor/InvestorDeals";
import OwnerDeals from "./Pages/Deals/DealsOwner/OwnerDeals";
import Orders from "./Pages/Orders/Orders";
import WriteReview from "./Pages/Orders/WriteReview";
import Privacy from "./Pages/Profiles/Profile-Components/privecy";
import ContactPage from "./Pages/Contact/contact";
import About from "./Pages/About/About";
import Returnorder from "./Pages/Orders/ReturnOrder";
import OwnerOwnDeals from "./Pages/Profiles/Profiles-Data/OwnerOwnDeals";

function App() {
  // Protected route component
  const ProtectedDealsRoute = () => {
    const currentRole = localStorage.getItem("role");

    if (!currentRole) {
      return <Navigate to="/auth/login" />;
    }

    return currentRole === "Investor" ? <InvestorDeals /> : <OwnerDeals />;
  };

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

      {/* Deals Routes */}
      <Route path="/investor/deals" element={<ProtectedDealsRoute />} />
      <Route path="/owner/Deals" element={<ProtectedDealsRoute />} />

      {/* Profile Routes */}
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/UserProfile" element={<NormalUserProfile />} />
      <Route path="/UserProfile/privacy" element={<Privacy />} />
      <Route path="/UserProfile/products" element={<NormalUserProfile />} />

      {/* Payment and Cart Routes */}
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order/payment-success" element={<PaymentSuccess />} />

      {/* Orders Routes */}
      <Route path="/UserProfile/orders" element={<Orders />} />
      <Route path="/UserProfile/return_order" element={<Returnorder />} />
      <Route
        path="/UserProfile/orders/write_review/:productId"
        element={<WriteReview />}
      />
      <Route path="/UserProfile/deals" element={<OwnerOwnDeals />} />
    </Routes>
  );
}

export default App;
