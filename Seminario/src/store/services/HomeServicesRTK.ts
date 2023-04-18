import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API = "http://localhost:3001";
const Token = localStorage.getItem("Token");
const JWT = Token;

export const EmpresasApi = createApi({
    reducerPath: "EmpresasApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        prepareHeaders: (headers) => {
            headers.set('apikey', "89393c34-e984-4376-83b8-6a94c708731e");
            headers.set('Authorization', JWT || '');
        }
    }),

    refetchOnMountOrArgChange: true, //Revalida los datos
    refetchOnFocus: true, // Revalida cuando hacemos focus a la pestaña
    refetchOnReconnect: true, // cuando estamos offline   

    endpoints: (builder) => ({
        getEmpresas: builder.query({
            query: (user) => ({
                url: "/empresas/all/" + user,
                method: "get",                
            })
            
        }),
        addEmpresa: builder.mutation({
            query: (body) => ({
                url: "/empresas/new",
                method: "post",
                body: body
            })
        }),

        EditEmpresa: builder.mutation({
            query: (args) => {
                const [Id, Nombre] = args;
                return {
                    url: `/empresas/updEmp/${Id}`,
                    method: "put",
                    body: {
                        "nombre": Nombre
                    },
                }
            }
        }),

    }),
});

export const { useGetEmpresasQuery, useAddEmpresaMutation, useEditEmpresaMutation } = EmpresasApi