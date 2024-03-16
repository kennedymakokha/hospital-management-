import { apiSlice } from "./apiSlice";
const USER_URL = "/api/medications";

export const medicationsApiSlice = apiSlice.injectEndpoints({
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

        delete: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreateMutation, useFetchQuery, useDeleteMutation, useUpdateMutation } = medicationsApiSlice