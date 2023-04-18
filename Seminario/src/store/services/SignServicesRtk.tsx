import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
const API = "http://localhost:3001";

export const LoginApi = createApi({
    reducerPath: "LoginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        prepareHeaders: (headers) =>{
            headers.set("apikey", "89393c34-e984-4376-83b8-6a94c708731e");            
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
