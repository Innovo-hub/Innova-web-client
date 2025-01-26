import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './Slices/Auth-Slice/RegisterReducer';
import loginSlice from './Slices/Auth-Slice/LoginReducer';
import profileSlice from './Slices/User-Slice/UserProfile';
import categorySlice from './Slices/Category-Slice/CategoryReducer';
import productSlice from './Slices/Product-Slice/ProductCategoryReducer';
const store = configureStore({
    reducer: {
        register: registerSlice,
        login: loginSlice,
        profile: profileSlice,
        category: categorySlice,
        product: productSlice
    }
});
export default store;
