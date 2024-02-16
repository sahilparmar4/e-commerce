import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/apiHandler";

export const logIn = createAsyncThunk("Login", 
    async(data:any, { dispatch })=>{
        try{
            dispatch(setLoader(true));
            const response = await API.login({data});
            return response;
        }catch(e){
            dispatch(setLoader(false));
            throw e;
        }
    }
);

export const products = createAsyncThunk("ProductListing",
    async(data: any, {dispatch})=>{
        try{
            dispatch(setLoader(false));
            const response: any = await API.productList({});
            return response;
        }catch(e){
            dispatch(setLoader(false));
            throw e;
        }
    }
);

export const getSingleProduct = createAsyncThunk("GetSingleProduct",
    async(data: any, {dispatch})=>{
        try{
            dispatch(setLoader(true));
            const response:any = await API.singleProduct(data);
            return response;
        }catch(e){
            dispatch(setLoader(false));
            throw e;
        }
    }
);

export const getAllCategories = createAsyncThunk("Categories",
    async(data: any, {dispatch})=>{
        try{
            dispatch(setLoader(true));
            const response: any = await API.categories(data);
            return response;
        }catch(e){
            throw e;
        }
    }
);

const initialState: object = {
    userLogin: {
        data: [],
        error: null
    },
    productListing: {
        data: [],
        error: null
    },
    singleProductDetail: {
        data: [],
        error: null
    },
    categoryListing: {
        data: [],
        error: null
    }
}

const productDataSlice: any = createSlice(
    {
        name: "UserLogin",
        initialState,
        reducers:{
            setLoader: (state: any, action: any)=>{
                state.isLoading = action.payload;
            }
        },
        extraReducers: (builder: any) =>{
            builder.addCase(logIn.fulfilled, (state: any, action: any)=>{
                state.userLogin.data = action.payload
            }).addCase(logIn.rejected, (state:any, action:any)=>{
                state.userLogin.error = action.error.message;
            }).addCase(products.fulfilled, (state: any, action: any)=>{
                state.productListing.data = action.payload
            }).addCase(products.rejected, (state:any, action:any)=>{
                state.productListing.error = action.error.message;
            }).addCase(getSingleProduct.fulfilled, (state: any, action: any)=>{
                state.singleProductDetail.data = action.payload
            }).addCase(getSingleProduct.rejected, (state:any, action:any)=>{
                state.singleProductDetail.error = action.error.message;
            }).addCase(getAllCategories.fulfilled, (state: any, action: any)=>{
                state.categoryListing.data = action.payload
            }).addCase(getAllCategories.rejected, (state:any, action:any)=>{
                state.categoryListing.error = action.error.message;
            })
        }
    }
);

export const { setLoader } = productDataSlice.actions;
export default productDataSlice.reducer;
