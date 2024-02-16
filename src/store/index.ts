import { configureStore } from "@reduxjs/toolkit";
import productDataSlice from "./prodcuts/productDataSlice";
import cartSlice from "./cart/cartSlice";

const store:any = configureStore({
    reducer: {
        productData: productDataSlice,
        cart: cartSlice
    }
    
});

export default store;