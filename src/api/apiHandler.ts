import { axiosClient } from "./apiClient";

// Login API
export function login (data: any){
    try{
        return axiosClient.post("/auth/login", data.data).then((res: any)=>{
            return res;
        });
    }catch(e){
        console.log(e);
    }
}

// Product Listing API
export function productList (data: any){
    try{
        return axiosClient.get("/products", data).then((res: any)=>{
            return res;
        });
    }catch(e){
        console.log(e);
    }
}

// Product Detail API
export function singleProduct(data: any){
    try{
        return axiosClient.get(`/products/${data}`).then((res: any)=>{
            return res;
        })
    }catch(e){
        console.log(e);
    }
}

// Category Listing API
export function categories(data: any){
    try{
        return axiosClient.get("/products/categories").then((res: any) => {
            return res;
        })
    }catch(e){
        throw e;
    }
}