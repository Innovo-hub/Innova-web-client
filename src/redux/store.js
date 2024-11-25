import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './Slices/Auth-Slice/RegisterReducer';
const store = configureStore({
    reducer: {
        register: registerSlice
    }
});
export default store;
