import { apiSlice } from "./apiSlice";
const USER_URL = "/api/test";

export const testApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTest: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateTest: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchTest: builder.query({
            query: () => `${USER_URL}`
        }),
        getsymptomsByPatient: builder.query({
            query: (id) => ({
                url: `${USER_URL}/symptoms/${id}`,
            })
        }),
        getsymptoms: builder.query({
            query: (id) => ({
                url: `${USER_URL}/symptoms`,
            })
        }),
        getAllTriageByPatient: builder.query({
            query: (id) => ({
                url: `${USER_URL}/all/${id}`,
            })
        }),
        deleteTest: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreateTestMutation, useGetAllTriageByPatientQuery,useDeleteTestMutation,useGetsymptomsQuery, useGetsymptomsByPatientQuery, useFetchTestQuery, useUpdateTestMutation } = testApiSlice