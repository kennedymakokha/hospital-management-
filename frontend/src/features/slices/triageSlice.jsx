import { apiSlice } from "./apiSlice";
const USER_URL = "/api/triage";

export const triageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTriage: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateTriage: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchTriage: builder.query({
            query: () => `${USER_URL}`
        }),
        getTriageByPatient: builder.query({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
            })
        }),
        getAllTriageByPatient: builder.query({
            query: (id) => ({
                url: `${USER_URL}/all/${id}`,
            })
        }),
        deleteTriage: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreateTriageMutation,useGetAllTriageByPatientQuery, useDeleteTriageMutation, useFetchTriageQuery, useGetTriageByPatientQuery, useUpdateTriageMutation } = triageApiSlice