import { apiSlice } from "./apiSlice";
const USER_URL = "/api/tests";

export const testApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTest: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        postPrescription: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/prescription/post-prescription`,
                method: "POST",
                body: data
            })
        }),
        postSales: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/payment`,
                method: "POST",
                body: data
            })
        }),
        fetchUserPrescriptions: builder.query({
            query: (id) => ({
                url: `${USER_URL}//prescription/post-prescription/${id}`,
            })
        }),
        createsymptoms: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/symptoms`,
                method: "POST",
                body: data
            })
        }),
        postresults: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/results`,
                method: "POST",
                body: data
            })
        }),
        fetchResults: builder.query({
            query: () => ({
                url: `${USER_URL}/results`,
            })
        }),
        fetchUserResults: builder.query({
            query: (id) => ({
                url: `${USER_URL}/results/${id}`,
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
            query: () => ({
                url: `${USER_URL}`,
            })
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

export const { usePostSalesMutation, useCreateTestMutation, usePostPrescriptionMutation, useFetchUserPrescriptionsQuery, useFetchResultsQuery, useFetchUserResultsQuery, useCreatesymptomsMutation, usePostresultsMutation, useGetAllTriageByPatientQuery, useDeleteTestMutation, useGetsymptomsQuery, useGetsymptomsByPatientQuery, useFetchTestQuery, useUpdateTestMutation } = testApiSlice