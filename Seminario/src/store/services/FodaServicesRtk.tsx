import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const API = "http://localhost:3001";
const Token = localStorage.getItem("Token");
const JWT = Token;

export const FodaApi = createApi({
    reducerPath: "FodaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        prepareHeaders: (headers) => {
            headers.set('apikey', "0273f8f2-4a8e-4fbf-9438-b1dcbddf4f52");
            headers.set('Authorization', JWT || '');
        }
    }),

    refetchOnMountOrArgChange: true, 
    refetchOnFocus: true, 
    refetchOnReconnect: true, 


    endpoints: (builder) => ({
        getFoda: builder.query({
            query: (user: string) => ({
                url: "Foda/FodaAll/?user=" + user,
                method: "get",
            })
        }),

        getFodaEntrys: builder.query({
            query: (foda: string) => ({
                url: `/fodaEntrys/allByFoda/${foda}`,
                method: "get",
            })
        }),

        Foda_Estado: builder.mutation({
            query: (args) => {
                const [id, idEmpresa, estado] = args;
                return {
                    url: `/Foda/${idEmpresa}/upd/${id}/estado`,
                    method: "put",
                    body: {
                        estado: estado
                    },
                }
            }
        }),

        Foda_Type_Count: builder.mutation({
            query: (args) => {
                const [Id, Type] = args;
                return {
                    url: `/foda/${Type}/upd/${Id}/cnt`,
                    method: "put",
                }
            }
        }),

        Foda_Type_Disc: builder.mutation({
            query: (args) => {
                const [Id, Type] = args;
                return {
                    url: `/foda/${Type}/upd/${Id}/cntRest`,
                    method: "put",
                }
            }
        }),


        FodaEntry_Type: builder.mutation({
            query: (args) => {
                const [tipo, id] = args;
                return {
                    url: `/FodaEntrys/updType/${id}`,
                    method: "put",
                    body: {
                        "tipo": tipo
                    },
                }
            }
        }),

        addFoda: builder.mutation({
            query: (args) => {
                const [idEmpresa, nombre, usuario] = args;
                return {
                    url: `/Foda/new/${idEmpresa}/${usuario}`,
                    method: "post",
                    body: {
                        "nombre": nombre
                    },
                }
            }
        }),

        addFodaEntrys: builder.mutation({
            query: (args) => {
                const [descripcion, foda] = args;
                return {
                    url: `/fodaEntrys/new/${foda}`,
                    method: "post",
                    body: {
                        "descripcion": descripcion
                    },
                }
            }
        }),

        DelFodaEntrys: builder.mutation({
            query: (id: string) => ({
                url: `/fodaEntrys/del/${id}`,
                method: "delete",
            })
        }),

        DelFoda: builder.mutation({
            query: (id: string) => ({
                url: `/fodaEntrys/del/${id}`,
                method: "delete",
            })
        })

    }),
});

export const { useAddFodaEntrysMutation,
    useGetFodaQuery,
    useGetFodaEntrysQuery,
    useFoda_EstadoMutation,
    useAddFodaMutation,
    useFodaEntry_TypeMutation,
    useDelFodaEntrysMutation,
    useFoda_Type_CountMutation,
    useFoda_Type_DiscMutation
} = FodaApi