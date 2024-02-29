import { apiSlice } from "./apiSlice";
const USER_URL = "/api/doc/history";

export const usersApiSlice = apiSlice.injectEndpoints({
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

        fetchHistory: builder.query({
            query: () => `${USER_URL}`
        }),
        deleteHistory: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreateMutation, useDeleteHistoryMutation, useUpdateMutation, useFetchHistoryQuery } = usersApiSlice