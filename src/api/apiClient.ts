import axios from "axios";

// Create API Client

export const axiosClient:any = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        "Content-Type": "application/json; charset=utf-8"
    }
});