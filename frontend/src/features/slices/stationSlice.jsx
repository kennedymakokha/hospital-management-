import { apiSlice } from "./apiSlice";
const USER_URL = "/api/stations";

export const stationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetch: builder.query({
            query: () => `${USER_URL}`
        }),
        fetchbyId: builder.query({
            query: (id) => `${USER_URL}/${id}`
        }),
       
        delete: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreateMutation,useFetchQuery, useFetchbyIdQuery, useDeleteMutation, useUpdateMutation } = stationApiSlice