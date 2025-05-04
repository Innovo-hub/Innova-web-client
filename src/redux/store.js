import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./Slices/Auth-Slice/RegisterReducer";
import loginSlice from "./Slices/Auth-Slice/LoginReducer";
import profileSlice from "./Slices/User-Slice/UserProfile";
import categorySlice from "./Slices/Category-Slice/CategoryReducer";
import productSlice from "./Slices/Product-Slice/ProductCategoryReducer";
import cartSlice from "./Slices/Cart-Slice/cartReducer";
import dealsSlice from "./Slices/Deals-Slice/DealsReducer";
import wishlistSlice from "./Slices/Wishlist-Slice/WIshlistReducer";
import orderSlice from "./Slices/Order-Slice/OrderReducer";
import reviewSlice from "./Slices/Review-Slice/ReviewReducer";

const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    profile: profileSlice,
    category: categorySlice,
    product: productSlice,
    cart: cartSlice,
    deals: dealsSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    reviews: reviewSlice,
  },
});
export default store;
