import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
const API = "http://localhost:3001";

export const LoginApi = createApi({
    reducerPath: "LoginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        prepareHeaders: (headers) =>{
            headers.set("apikey", "0273f8f2-4a8e-4fbf-9438-b1dcbddf4f52");            
        }
    }),
    
    endpoints: (builder) => ({
        Getlogin: builder.query({
            query: (body) => ({
                url: "/security/signon",
                method: "get",
                body: body
            }),
        }),

        CrearUsuario: builder.mutation({
            query: (body) => ({
                url: "/security/signin",
                method: "get",
                body: body
            }),
        }),
    }),
});




export const { } = LoginApi
