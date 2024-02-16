import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk("AddToCart",
async (product: any, { dispatch }) => {
    try {
        dispatch(setLoader(true));
        return product;
    } catch (e) {
        dispatch(setLoader(false));
            throw e;
        }
    }
        
);

export const removeFromCart = createAsyncThunk("RemoveFromCart",
    async (product: any, { dispatch }) => {
        try {
            dispatch(setLoader(true));
            return product;
        } catch (e) {
            dispatch(setLoader(false));
            throw e;
        }
    }
);

export const updateQuantity = createAsyncThunk("UpdateQuantity",
    async ({productId, quantity}: {productId: any, quantity: any}, { dispatch }) => {
        try {
            let qty: any = parseInt(quantity);
            dispatch(setLoader(true));
            return { productId, quantity };
        } catch (e) {
            dispatch(setLoader(false));
            throw e;
        }
    }
);

const initialState: any = {
    cartItems: [],
    count: 0,
    error: null,
    isLoading: false
}

const cartSlice: any = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setLoader: (state: any, action: any) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(addToCart.fulfilled, (state: any, action: any) => {
            const product: any = action.payload;
            // const existingItemIndex: any = state.cartItems.findIndex((item: any) => item.id === product.id));
            const existingItemIndex: any = state.cartItems.findIndex((item: any) => console.log("Line 65", item));

            if (existingItemIndex !== -1) {
                state.cartItems[existingItemIndex].quantity += 1;
            } else {
                state.cartItems.push({ product, quantity: 1 });
            }
            state.count += 1;
            state.isLoading = false;
        }).addCase(addToCart.rejected, (state: any, action: any) => {
            state.isLoading = false;
        }).addCase(removeFromCart.fulfilled, (state: any, action: any) => {
            const product: any = action.payload;
            const itemIndex = state.cartItems.findIndex((item: any) => item.product.id === product.id);

            if (itemIndex !== -1) {
                state.count -= state.cartItems[itemIndex].quantity;
                state.cartItems.splice(itemIndex, 1);
            }

            state.isLoading = false;
        }).addCase(removeFromCart.rejected, (state: any, action: any) => {
            state.isLoading = false;
        }).addCase(updateQuantity.fulfilled, (state: any, action: any) => {
            let { productId, quantity }: { productId: any, quantity: any } = action.payload;
            const itemIndex: any = state.cartItems.findIndex((item: any) => item.product.id === productId);
            if (Array.isArray(state.cartItems) && state.cartItems.length > 0) {
                if (itemIndex !== -1) {
                    state.count += parseInt(quantity) - state.cartItems[itemIndex].quantity;
                    state.cartItems[itemIndex].quantity = parseInt(quantity);
                }
            }
            state.isLoading = false;
        }).addCase(updateQuantity.rejected, (state: any, action: any) => {
            state.isLoading = false;
        })
    }
});

export const { setLoader } = cartSlice.actions;
export default cartSlice.reducer;