import { apiSlice } from "./apiSlice";
const USER_URL = "/api/medications";

export const MedsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMed: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateMed: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchMeds: builder.query({
            query: () => `${USER_URL}`
        }),
      
        deleteMed: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const {  useDeleteMedMutation, useFetchMedsQuery, useUpdateMedMutation, useCreateMedMutation } = MedsApiSlice